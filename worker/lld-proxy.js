// LLD Worker: MFL proxy for the standalone app + league alerts (push notifications). One Worker, one deploy.
//
// MFL PROXY (used by the app)
//   POST /login        { username, password, year, leagueId }  ->  { ok, cookie, franchiseId }
//   ANY  /mfl/<path>   -> https://<host>.myfantasyleague.com/<path>
//   ANY  /mflapi/<path>-> https://api.myfantasyleague.com/<path>
// ALERTS (push to your phone; watches MFL every 5 minutes)
//   /vapid /subscribe /prefs /feed /latest /testme   (used by the app)   /test /faketrade /probe /check   (admin, need ?k=ADMIN_KEY)
// Needs on this Worker: a KV binding named STATE; variables LEAGUE_ID (63085), FRANCHISE_ID (0001); secrets MFL_APIKEY, ADMIN_KEY;
// a Cron Trigger every 5 minutes (*/5 * * * *). Optional variables: CONTACT (mailto:you@...), YEAR, TX_TYPES.
const ALLOW_ORIGINS = ['https://zewolff1.github.io', 'http://localhost:8080', 'http://127.0.0.1:8080'];
const HOST_RE = /^www\d+\.myfantasyleague\.com$/;
const DEFAULT_HOST = 'www45.myfantasyleague.com';

function cors(req, extra) {
  const o = req.headers.get('Origin') || '';
  const h = new Headers(extra || {});
  if (ALLOW_ORIGINS.includes(o)) h.set('Access-Control-Allow-Origin', o);
  h.set('Vary', 'Origin');
  h.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  h.set('Access-Control-Allow-Headers', 'Content-Type, X-MFL-Cookie, X-MFL-Host');
  h.set('Access-Control-Expose-Headers', 'X-MFL-Set-Cookie, X-MFL-Status');
  return h;
}
const json = (req, obj, status) => new Response(JSON.stringify(obj), { status: status || 200, headers: cors(req, { 'Content-Type': 'application/json' }) });

function cookieFrom(setCookies) {
  const out = [];
  (setCookies || []).forEach(c => { const m = c.match(/^(MFL_USER_ID|MFL_PW_SEQ|MFL_PW_SEQ_[A-Z0-9]+)=([^;]*)/); if (m) out.push(m[1] + '=' + m[2]); });
  return out.join('; ');
}
function setCookieList(res) {
  if (typeof res.headers.getSetCookie === 'function') return res.headers.getSetCookie();
  const v = res.headers.get('set-cookie'); return v ? v.split(/,(?=\s*[A-Za-z0-9_]+=)/) : [];
}

async function login(req) {
  let b; try { b = await req.json(); } catch (e) { return json(req, { ok: false, error: 'bad request' }, 400); }
  const year = /^\d{4}$/.test(String(b.year)) ? b.year : new Date().getFullYear();
  const body = new URLSearchParams({ USERNAME: b.username || '', PASSWORD: b.password || '', XML: '1' });
  const r = await fetch('https://api.myfantasyleague.com/' + year + '/login', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'LLD-Standalone' }, body, redirect: 'manual'
  });
  const text = await r.text();
  const id = (text.match(/MFL_USER_ID="([^"]+)"/) || [])[1];
  let cookie = cookieFrom(setCookieList(r));
  if (!cookie && id) cookie = 'MFL_USER_ID=' + id;
  if (!id && !cookie) return json(req, { ok: false, error: 'MFL rejected that username or password.' }, 401);
  // find this owner's franchise in the league
  let franchiseId = '';
  try {
    const ml = await fetch('https://api.myfantasyleague.com/' + year + '/export?TYPE=myleagues&YEAR=' + year + '&JSON=1', { headers: { Cookie: cookie, 'User-Agent': 'LLD-Standalone' } });
    const j = await ml.json();
    let L = (j.leagues && j.leagues.league) || [];
    if (!Array.isArray(L)) L = [L];
    const mine = L.find(x => String(x.league_id) === String(b.leagueId));
    if (mine) franchiseId = String(mine.franchise_id || '');
  } catch (e) { }
  return json(req, { ok: true, cookie, franchiseId });
}

async function proxy(req, url, api) {
  const rest = url.pathname.replace(/^\/mfl(api)?\//, '');
  let host = api ? 'api.myfantasyleague.com' : (req.headers.get('X-MFL-Host') || DEFAULT_HOST);
  if (!api && !HOST_RE.test(host)) host = DEFAULT_HOST;
  const target = 'https://' + host + '/' + rest + url.search;
  const h = new Headers({ 'User-Agent': 'LLD-Standalone' });
  const ck = req.headers.get('X-MFL-Cookie'); if (ck) h.set('Cookie', ck);
  const ct = req.headers.get('Content-Type'); if (ct) h.set('Content-Type', ct);
  const init = { method: req.method, headers: h, redirect: 'manual' };
  if (req.method === 'POST') init.body = await req.arrayBuffer();
  const r = await fetch(target, init);
  const out = cors(req);
  const rct = r.headers.get('Content-Type'); if (rct) out.set('Content-Type', rct);
  const sc = cookieFrom(setCookieList(r)); if (sc) out.set('X-MFL-Set-Cookie', sc);
  const loc = r.headers.get('Location'); if (loc) out.set('X-MFL-Location', loc);
  out.set('X-MFL-Status', String(r.status));
  out.set('Cache-Control', 'no-store');
  // redirects become 200 so the app can read them; the real status is in X-MFL-Status
  const status = r.status >= 300 && r.status < 400 ? 200 : r.status;
  return new Response(r.status === 204 ? null : await r.arrayBuffer(), { status, headers: out });
}


// ================= ALERTS =================
const J = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'access-control-allow-headers': 'content-type', 'access-control-allow-methods': 'GET,POST,OPTIONS' } });
const b64u = u8 => btoa(String.fromCharCode(...u8)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64uStr = s => b64u(new TextEncoder().encode(s));
async function sid(endpoint) { const h = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(endpoint))); return [...h].map(x => x.toString(16).padStart(2, '0')).join('').slice(0, 24); }

async function keys(env) {
    let k = await env.STATE.get('vapid', { type: 'json' }); if (k) return k;
    const kp = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
    const KP = /** @type {any} */ (kp);
    k = { priv: await crypto.subtle.exportKey('jwk', KP.privateKey), pub: b64u(new Uint8Array(/** @type {ArrayBuffer} */ (await crypto.subtle.exportKey('raw', KP.publicKey)))) };
    await env.STATE.put('vapid', JSON.stringify(k)); return k;
}
async function vapid(env, endpoint) {
    const k = await keys(env), h = b64uStr(JSON.stringify({ typ: 'JWT', alg: 'ES256' }));
    const c = b64uStr(JSON.stringify({ aud: new URL(endpoint).origin, exp: Math.floor(Date.now() / 1000) + 43200, sub: env.CONTACT || 'mailto:admin@example.com' }));
    const key = await crypto.subtle.importKey('jwk', k.priv, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
    const sig = new Uint8Array(await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, key, new TextEncoder().encode(h + '.' + c)));
    return `vapid t=${h}.${c}.${b64u(sig)}, k=${k.pub}`;
}
// The push itself carries no text (that keeps this simple). The phone wakes the app, which asks /latest for the message.
async function ping(env, id, endpoint) {
    const r = await fetch(endpoint, { method: 'POST', headers: { Authorization: await vapid(env, endpoint), TTL: '3600', Urgency: 'high' } });
    if (r.status === 404 || r.status === 410) { await env.STATE.delete('sub:' + id); await env.STATE.delete('q:' + id); }
    return r.status;
}
// Every phone that turned on alerts belongs to one franchise (checked against MFL when it subscribed). Old subscriptions with no franchise saved belong to the owner of this Worker (FRANCHISE_ID).
const myFidOf = env => String(env.FRANCHISE_ID || '').padStart(4, '0');
const subFidOf = (env, v) => v && v.fid !== undefined ? String(v.fid || '') : myFidOf(env);
const OWN_SKIP = ['board', 'tb', 'tx'];   // no alert for your own post, trade block update or pickup
const NONDEV_OFF = ['tx', 'tb'];          // other owners start with these two off and can switch them on
const wants = (env, pf, type, fid) => pf[type] !== undefined ? pf[type] !== false : !(NONDEV_OFF.includes(type) && fid !== myFidOf(env) && fid !== '0000');
async function broadcast(env, msgs, opt) {
    try { const fd = (await env.STATE.get('feed', { type: 'json' })) || [], now = Date.now(); msgs.filter(m => m.type).forEach(m => fd.push({ type: m.type, title: m.title, body: m.body || '', fid: m.fid || '', to: m.to || '', pids: m.pids || [], ts: now })); await env.STATE.put('feed', JSON.stringify(fd.slice(-40))); } catch (e) { }
    const subs = await env.STATE.list({ prefix: 'sub:' }); let n = 0;
    for (const s of subs.keys) {
        const id = s.name.slice(4), v = await env.STATE.get(s.name, { type: 'json' }); if (!v) continue;
        const mf = subFidOf(env, v); if (opt && opt.only !== undefined && mf !== opt.only) continue;
        const pf = (await env.STATE.get('pref:' + id, { type: 'json' })) || {};
        const mine = msgs.filter(m => (!m.to || m.to === mf) && !(OWN_SKIP.includes(m.type) && m.fid && m.fid === mf) && (!m.type || wants(env, pf, m.type, mf))); if (!mine.length) continue;
        const q = (await env.STATE.get('q:' + id, { type: 'json' })) || [];
        await env.STATE.put('q:' + id, JSON.stringify(q.concat(mine).slice(-10)), { expirationTtl: 86400 });
        try { await ping(env, id, v.endpoint); n++; } catch (e) { }
    }
    return n;
}
// The set of franchises that have at least one phone subscribed (the commissioner account 0000 has no team of its own)
async function subFids(env) {
    const subs = await env.STATE.list({ prefix: 'sub:' }), set = new Set();
    for (const s of subs.keys) { const v = await env.STATE.get(s.name, { type: 'json' }); if (!v) continue; const f = subFidOf(env, v); if (f && f !== '0000') set.add(f); }
    return [...set];
}
// Asks MFL which franchise this login owns in your league. The login cookie is used for this one request and never saved.
async function verifyFid(env, cookie) {
    try {
        const y = env.YEAR || new Date().getFullYear();
        const r = await fetch(`https://api.myfantasyleague.com/${y}/export?TYPE=myleagues&YEAR=${y}&JSON=1`, { headers: { Cookie: String(cookie).slice(0, 800), 'User-Agent': 'lld-alerts' } });
        const j = await r.json(); let L = (j.leagues && j.leagues.league) || []; if (!Array.isArray(L)) L = [L];
        const mine = L.find(x => String(x.league_id) === String(env.LEAGUE_ID)); return mine ? String(mine.franchise_id || '').padStart(4, '0') : null;
    } catch (e) { return null; }
}

async function mfl(env, type, extra) {
    const y = env.YEAR || new Date().getFullYear();
    const u = `https://api.myfantasyleague.com/${y}/export?TYPE=${type}&L=${env.LEAGUE_ID}&APIKEY=${encodeURIComponent(env.MFL_APIKEY || '')}&JSON=1${extra || ''}`;
    const r = await fetch(u, { headers: { 'User-Agent': 'lld-alerts' } }); return r.json();
}
const ids = x => String(x || '').split(',').map(z => z.trim()).filter(z => /^\d+$/.test(z));
const arr = x => x == null ? [] : Array.isArray(x) ? x : [x];
// How alerts read (chosen in the notification preview).  team: 'full' (Jacksonville Juicebox) | 'nick' (Juicebox)
// player: 'full' (Jaylen Warren) | 'short' (J. Warren)   detail: 'full' | 'short'
const STYLE = { team: 'nick', player: 'short', detail: 'short' };
const NICKS = ['Taylor Hams', 'Pork Rolls', 'Best Budz', 'Discovery', 'Bandits', 'Juicebox', 'Wilson', 'Oceans', 'Ghosts', 'Pioneers'];
const teamLabel = full => { full = String(full || ''); if (STYLE.team !== 'nick') return full; const n = NICKS.find(k => full.toLowerCase().endsWith(k.toLowerCase())); return n || full; };
const SHORT = STYLE.detail === 'short';
async function teamNames(env) {
    let t = await env.STATE.get('teams', { type: 'json' }); if (t) return t;
    t = {}; const lo = {}; try { const lg = (await mfl(env, 'league')).league || {}; arr(lg.franchises && lg.franchises.franchise).forEach(f => { t[f.id] = f.name; const u = f.logo || f.icon; if (u) lo[f.id] = u; }); } catch (e) { } await env.STATE.put('logos', JSON.stringify(lo), { expirationTtl: 86400 });
    if (Object.keys(t).length) await env.STATE.put('teams', JSON.stringify(t), { expirationTtl: 86400 }); return t;
}
async function assets(env, list) {
    const ids = String(list || '').split(',').map(x => x.trim()).filter(Boolean), pl = ids.filter(x => !/^(FP|DP|BB)_/.test(x)), nm = {};
    if (pl.length) { try { arr(((await mfl(env, 'players', '&DETAILS=0&PLAYERS=' + pl.join(','))).players || {}).player).forEach(p => { const n = String(p.name || '').split(','); nm[p.id] = n.length > 1 ? ((STYLE.player === 'short' && /^(QB|RB|WR|TE|PK|K|DL|DE|DT|LB|DB|CB|S|P|PN)$/.test(String(p.position || '')) && n[1].trim()) ? n[1].trim()[0] + '. ' : n[1].trim() + ' ') + n[0].trim() : n[0]; }); } catch (e) { } }
    return ids.map(x => { let m; if ((m = x.match(/^FP_\d+_(\d{4})_(\d+)$/))) return `${m[1]} round ${m[2]} pick`; if ((m = x.match(/^DP_(\d+)_(\d+)$/))) return `pick ${+m[1] + 1}.${String(+m[2] + 1).padStart(2, '0')}`; if (/^BB_/.test(x)) return 'blind bid $'; return nm[x] || 'player ' + x; }).join(', ') || 'nothing';
}

const LEAGUE_URL = env => env.LEAGUE_PAGE || `https://www45.myfantasyleague.com/${new Date().getFullYear()}/home/${env.LEAGUE_ID}`;
const strip = h => String(h || '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
function tbDec(t) { const m = /LLDTB1:([A-Za-z0-9_\-]+)/.exec(String(t || '')); if (!m) return null; try { let b = m[1].replace(/-/g, '+').replace(/_/g, '/'); while (b.length % 4) b += '='; return JSON.parse(decodeURIComponent(escape(atob(b)))); } catch (e) { return null; } }
const TB_MODE = { W: 'Win Now', B: 'Balanced', N: 'Next Year' };
// Message board: normal posts become "board" alerts. The trade block data thread becomes "tb" alerts. Other [LLD-DATA] threads are ignored.
async function pollBoard(env, st, nameOf, out) {
    const me = String(env.FRANCHISE_ID || '').padStart(4, '0');
    const mb = (await mfl(env, 'messageBoard')).messageBoard || {}, threads = arr(mb.thread);
    const seen = st.bd || {}, first = !st.bdInit; const next = {};
    for (const t of threads) {
        const id = t.id, subj = t.subject || '', last = Number(t.lastPostTime || t.last_post_time || t.timestamp || 0) || 0;
        next[id] = last; if (seen[id] != null && last && last <= seen[id]) continue;
        const isTb = subj === '[LLD-DATA] Trade Block', isData = /^\[LLD-DATA\]/.test(subj);
        if (isData && !isTb) continue;
        let posts = []; try { posts = arr(((await mfl(env, 'messageBoardThread', '&THREAD=' + encodeURIComponent(id))).messageBoardThread || {}).post); } catch (e) { continue; }
        const base = seen[id] != null ? seen[id] : (first ? Infinity : 0);
        for (const p of posts.sort((a, b) => a.timestamp - b.timestamp)) {
            const ts = Number(p.timestamp || 0); if (!ts || ts <= base) continue;
            const f = String(p.franchise || p.franchise_id || '').padStart(4, '0');
            if (isTb) {
                const o = tbDec(p.body || p.message); if (!o) continue; const v = Object.values(o.p || {}).map(x => String(x)[0]);
                const c = k => v.filter(x => x === k).length, parts = []; if (c('S')) parts.push(c('S') + ' seeking'); if (c('W')) parts.push(c('W') + ' willing'); if (c('U')) parts.push(c('U') + ' unlikely'); if (c('N')) parts.push(c('N') + ' unavailable');
                out.push({ type: 'tb', fid: f, title: nameOf(f) + ' updated their trade block', body: SHORT ? 'Status changed' : ([TB_MODE[o.m] || '', parts.join(' \u2022 ')].filter(Boolean).join(' \u2022 ') || 'Status changed'), url: LEAGUE_URL(env) });
            } else out.push({ type: 'board', fid: f, title: (f && f !== '0000' ? nameOf(f) : 'Commissioner') + ' posted' + (subj ? ': ' + subj : ''), body: SHORT ? 'New message board post' : (strip(p.body || p.message).slice(0, 140) || 'New message board post'), url: LEAGUE_URL(env) });
        }
    }
    st.bd = next; st.bdInit = true;
}
// Preview / recap reminders: Thursday and Tuesday around 9 AM Eastern, once each
async function pollTimed(env, st, out) {
    const f = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', hour12: false, year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(new Date()), g = k => (f.find(x => x.type === k) || {}).value, hr = +g('hour') % 24, day = g('weekday');
    if (hr < 9 || hr > 11) return; const key = g('year') + '-' + g('month') + '-' + g('day');
    st.tm = st.tm || {};
    if (day === 'Thu' && st.tm.pv !== key) { st.tm.pv = key; out.push({ type: 'preview', title: 'Matchup preview', body: SHORT ? 'Ready in your dashboard.' : 'This week\u2019s preview is ready in your dashboard.', url: LEAGUE_URL(env) }); }
    if (day === 'Tue' && st.tm.rc !== key) { st.tm.rc = key; out.push({ type: 'recap', title: 'Weekly recap', body: SHORT ? 'Ready in your dashboard.' : 'Last week\u2019s recap is ready in your dashboard.', url: LEAGUE_URL(env) }); }
}
// Lineup check for every owner with alerts on: Thursday ~6 PM and Sunday ~10:30 AM Eastern, once each per owner. Empty starter spots and starters who are Out / IR.
// force = true (from /lineupnow) skips the time window and the once-per-day rule, and returns what it saw so you can test it any time
async function pollLineup(env, st, nameOf, out, force, fidList) {
    const f = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false, year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(new Date()), g = k => (f.find(x => x.type === k) || {}).value;
    const hr = +g('hour') % 24, mn = +g('minute'), day = g('weekday'), t = hr * 60 + mn, key = g('year') + '-' + g('month') + '-' + g('day');
    const slot = (day === 'Thu' && t >= 1080 && t <= 1170) ? 'thu' : (day === 'Sun' && t >= 630 && t <= 720) ? 'sun' : '';
    st.lu = st.lu || {};
    if (!force && !slot) return {};
    const todo = (fidList || []).filter(x => force || st.lu[x + ':' + slot] !== key), res = {}; if (!todo.length) return res;
    const lg = (await mfl(env, 'league')).league || {}, need = parseInt((lg.starters && lg.starters.count) || '0', 10) || 0;
    const frs = arr(((await mfl(env, 'liveScoring')).liveScoring || {}).franchise);
    let inj = null; try { inj = {}; arr(((await mfl(env, 'injuries')).injuries || {}).injury).forEach(i => { inj[String(i.id)] = String(i.status || ''); }); } catch (e) { inj = null; }
    for (const fid of todo) {
        const fr = frs.find(x => String(x.id).padStart(4, '0') === fid);
        if (!fr) { res[fid] = { note: 'MFL has no live scoring for franchise ' + fid + ' right now (normal on a bye week or off-season)', need }; continue; }
        const starters = arr(fr.players && fr.players.player).filter(p => String(p.status).toLowerCase() === 'starter');
        if (!force) st.lu[fid + ':' + slot] = key; const problems = []; let count = 0;
        if (need && starters.length < need) { count += need - starters.length; problems.push((need - starters.length) + ' empty starting spot' + (need - starters.length > 1 ? 's' : '')); }
        if (inj) { const bad = starters.filter(p => /^(out|ir|injured reserve|suspended|pup)/i.test(inj[String(p.id)] || '')).map(p => p.id); count += bad.length; if (bad.length) problems.push((await assets(env, bad.join(','))) + (bad.length > 1 ? ' are' : ' is') + ' ruled out'); }
        if (problems.length) out.push({ type: 'lineup', to: fid, fid, title: 'Check your lineup', body: SHORT ? count + ' problem' + (count > 1 ? 's' : '') : problems.join(' \u2022 '), url: LEAGUE_URL(env) });
        res[fid] = { startersNeeded: need, startersSet: starters.length, problems };
    }
    return res;
}
// Turns MFL's raw transaction text (player ids) into a readable alert
async function fmtTx(env, t, nameOf) {
    const who = nameOf(t.franchise), ty = String(t.type || ''), pt = String(t.transaction || '').split('|'), L = x => String(x || '').split(',').map(z => z.trim()).filter(Boolean).length;
    let add = '', drop = '', bid = '';
    if (ty === 'BBID_WAIVER') { add = pt[0]; bid = pt[1]; drop = pt[2]; } else if (ty === 'AUCTION_WON') { add = pt[0]; bid = pt[1]; } else { add = pt[0]; drop = pt[1]; }
    const an = L(add) ? await assets(env, add) : '', dn = L(drop) ? await assets(env, drop) : '', money = bid && +bid ? ' for $' + (+bid) : '';
    const verb = ty === 'WAIVER' || ty === 'BBID_WAIVER' ? 'won on waivers' : ty === 'AUCTION_WON' ? 'won at auction' : 'added';
    const pids = ids(add).concat(ids(drop)).slice(0, 2);
    if (an && dn) return { pids, title: who + ' ' + verb + ' ' + an, body: SHORT ? (money ? money.slice(1) : 'Free agent pickup') : 'Dropped ' + dn + money };
    if (an) return { pids, title: who + ' ' + verb + ' ' + an, body: money ? money.slice(1) : 'Free agent pickup' };
    if (dn) return { pids, title: who + ' dropped ' + dn, body: 'Back to free agency' };
    return { title: ty.replace(/_/g, ' ').toLowerCase(), body: who + ': ' + String(t.transaction || '').slice(0, 100) };
}
async function poll(env) {
    const st = (await env.STATE.get('seen', { type: 'json' })) || { init: false, trades: [], tx: 0 }, out = [], teams = await teamNames(env);
    const nameOf = f => teamLabel(teams[f] || ('Team ' + f)), me = myFidOf(env), targets = await subFids(env);
    st.fi = st.fi || {}; if (st.init && me && st.fi[me] === undefined) st.fi[me] = true; // the owner of this Worker was already being watched
    // Trade offers: each owner only hears about offers made TO their team
    for (const fid of targets) {
        const first = !st.fi[fid];
        try {
            const pt = arr(((await mfl(env, 'pendingTrades', '&FRANCHISE_ID=' + fid)).pendingTrades || {}).pendingTrade);
            for (const t of pt) {
                const key = fid + ':' + t.trade_id; if (st.trades.includes(key) || (fid === me && st.trades.includes(t.trade_id))) continue; st.trades.push(key);
                const toRaw = String(t.offeredto || t.offered_to || ''), to = toRaw ? toRaw.padStart(4, '0') : '', from = String(t.offeringteam || '').padStart(4, '0');
                if (to ? to !== fid : from === fid) continue;
                if (first || !st.init) continue; // first look at this owner: don't announce offers that were already waiting
                out.push({ type: 'offer', to: fid, fid: t.offeringteam, pids: ids(t.will_give_up).slice(0, 3), title: 'Trade offer from ' + nameOf(t.offeringteam), body: SHORT ? `${await assets(env, t.will_give_up)} for ${await assets(env, t.will_receive)}` : `They give: ${await assets(env, t.will_give_up)} • You give: ${await assets(env, t.will_receive)}`, url: LEAGUE_URL(env) });
            }
            st.fi[fid] = true;
        } catch (e) { }
    }
    st.trades = st.trades.slice(-300);
    try {
        const types = String(env.TX_TYPES || 'TRADE,FREE_AGENT,WAIVER,BBID_WAIVER,AUCTION_WON').split(',').map(x => x.trim()), tx = arr(((await mfl(env, 'transactions', '&COUNT=30')).transactions || {}).transaction);
        let mx = st.tx;
        for (const t of tx.sort((a, b) => a.timestamp - b.timestamp)) {
            const ts = +t.timestamp || 0; if (ts <= st.tx) continue; mx = Math.max(mx, ts); if (!st.init || !types.includes(t.type)) continue;
            if (t.type === 'TRADE') out.push({ type: 'trade', fid: t.franchise, pids: ids(t.franchise1_gave_up).concat(ids(t.franchise2_gave_up)).slice(0, 3), title: 'Trade completed', body: SHORT ? `${nameOf(t.franchise)} ⇄ ${nameOf(t.franchise2)}` : `${nameOf(t.franchise)} ⇄ ${nameOf(t.franchise2)}: ${await assets(env, t.franchise1_gave_up)} for ${await assets(env, t.franchise2_gave_up)}`, url: LEAGUE_URL(env) });
            else out.push(Object.assign({ type: 'tx', fid: t.franchise, pids: ids(t.transaction).slice(0, 2), url: LEAGUE_URL(env) }, await fmtTx(env, t, nameOf)));
        }
        st.tx = mx;
    } catch (e) { }
    try { await pollBoard(env, st, nameOf, out); } catch (e) { }
    if (st.init) { try { await pollTimed(env, st, out); } catch (e) { } }
    if (st.init) { try { await pollLineup(env, st, nameOf, out, false, targets); } catch (e) { } }
    st.init = true; await env.STATE.put('seen', JSON.stringify(st));
    if (out.length) await broadcast(env, out);
    return out.length;
}

// ---- /probe: checks which MFL data the API gives for your league (for planning the separate app). Admin only. Never prints the API key. ----
function firstList(v, path, d) {
    path = path || ''; d = d || 0;
    if (Array.isArray(v)) return { path, v };
    if (v && typeof v === 'object' && d < 4) { for (const k of Object.keys(v)) { const r = firstList(v[k], path + '/' + k, d + 1); if (r) return r; } }
    return null;
}
function shapeOf(j) {
    const a = firstList(j); if (!a) return { keys: j && typeof j === 'object' ? Object.keys(j).slice(0, 30) : typeof j };
    const f = a.v[0], out = { path: a.path, count: a.v.length, fields: f && typeof f === 'object' ? Object.keys(f) : [] };
    if (f && typeof f === 'object') { const inner = firstList(Object.assign({}, f, {})); if (inner && inner.path !== '') { const g = inner.v[0]; out.inner = { path: inner.path, count: inner.v.length, fields: g && typeof g === 'object' ? Object.keys(g) : [] }; } }
    return out;
}
async function probe(env, only) {
    const y = env.YEAR || new Date().getFullYear(), key = env.MFL_APIKEY || '';
    const T = [['league', ''], ['rosters', ''], ['players', '&DETAILS=1'], ['playerProfile', '&P=13593'], ['nflSchedule', ''], ['schedule', ''], ['liveScoring', ''], ['weeklyResults', '&W=1'], ['leagueStandings', ''], ['pendingTrades', ''], ['tradeBait', ''], ['futureDraftPicks', ''], ['assets', ''], ['transactions', ''], ['freeAgents', ''], ['projectedScores', ''], ['playerScores', '&W=1'], ['draftResults', ''], ['messageBoard', ''], ['salaries', ''], ['salaryAdjustments', ''], ['calendar', ''], ['rules', ''], ['injuries', ''], ['playerRosterStatus', ''], ['myleagues', '']];
    const want = only ? String(only).split(',') : null, list = want ? T.filter(t => want.indexOf(t[0]) >= 0) : T, res = {};
    await Promise.all(list.map(async ([type, extra]) => {
        const t0 = Date.now(), u = `https://api.myfantasyleague.com/${y}/export?TYPE=${type}&L=${env.LEAGUE_ID}&APIKEY=${encodeURIComponent(key)}&JSON=1${extra}`;
        try {
            const r = await fetch(u, { headers: { 'User-Agent': 'lld-alerts' } }), txt = await r.text();
            let j = null; try { j = JSON.parse(txt); } catch (e) { }
            res[type] = { status: r.status, ms: Date.now() - t0, cors: r.headers.get('access-control-allow-origin') || 'none', bytes: txt.length, shape: j ? (j.error ? { error: String((j.error && j.error['$t']) || j.error).slice(0, 120) } : shapeOf(j)) : { notJson: txt.slice(0, 80).replace(key, '***') } };
        } catch (e) { res[type] = { error: String(e).replace(key, '***').slice(0, 120) }; }
    }));
    return { year: y, league: env.LEAGUE_ID, results: res };
}


export default {
  async fetch(req, env) {
    const url = new URL(req.url), p = url.pathname;
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(req) });
    const o = req.headers.get('Origin');
    if (o && !ALLOW_ORIGINS.includes(o)) return json(req, { ok: false, error: 'origin not allowed' }, 403);
    const ALERT = ['/vapid', '/subscribe', '/prefs', '/feed', '/latest', '/testme', '/test', '/faketrade', '/probe', '/check', '/sample', '/lineupnow'];
    if (ALERT.includes(p)) {
      try {
        if (!env.STATE) return J({ error: 'The STATE KV binding is missing on this Worker.' }, 500);
        const u = url;
        if (p === '/vapid') return J({ key: (await keys(env)).pub });
        if (p === '/subscribe' && req.method === 'POST') {
          const s = await req.json(); if (!s || !s.endpoint) return J({ error: 'bad subscription' }, 400); const id = await sid(s.endpoint);
          const old = await env.STATE.get('sub:' + id, { type: 'json' }); let fid = old && old.fid !== undefined ? old.fid : (old ? undefined : '');
          if (s.cookie) { const v = await verifyFid(env, s.cookie); if (v !== null) fid = v === '0000' ? myFidOf(env) : v; } // the commissioner login (0000) is you, so it gets your team's alerts
          const rec = { endpoint: s.endpoint, t: Date.now() }; if (fid !== undefined) rec.fid = fid;
          await env.STATE.put('sub:' + id, JSON.stringify(rec)); return J({ ok: true, id, fid: fid === undefined ? myFidOf(env) : fid });
        }
        if (p === '/prefs') { const id = (u.searchParams.get('id') || '').replace(/[^a-f0-9]/g, ''); if (!id) return J({ error: 'no id' }, 400); if (req.method === 'POST') { const b = await req.json(); const keys = ['offer', 'trade', 'tx', 'board', 'tb', 'preview', 'recap', 'lineup'], o = {}; keys.forEach(k => { if (b && k in b) o[k] = !!b[k]; }); await env.STATE.put('pref:' + id, JSON.stringify(o)); return J({ ok: true }); } return J({ prefs: (await env.STATE.get('pref:' + id, { type: 'json' })) || {} }); }
        if (p === '/feed') { const items = ((await env.STATE.get('feed', { type: 'json' })) || []).filter(i => !i.to).slice(-30).reverse(), logos = (await env.STATE.get('logos', { type: 'json' })) || {}; return J({ items, logos }); }
        if (p === '/latest') { const id = u.searchParams.get('id') || ''; const q = (await env.STATE.get('q:' + id, { type: 'json' })) || []; await env.STATE.delete('q:' + id); return J({ msgs: q }); }
        if (p === '/testme') { const id = (u.searchParams.get('id') || '').replace(/[^a-f0-9]/g, ''); const v = id && await env.STATE.get('sub:' + id, { type: 'json' }); if (!v) return J({ error: 'not subscribed' }, 404); const q = (await env.STATE.get('q:' + id, { type: 'json' })) || []; await env.STATE.put('q:' + id, JSON.stringify(q.concat([{ title: 'LLD Alerts', body: 'Test notification. It works!', url: '' }]).slice(-10)), { expirationTtl: 3600 }); const st = await ping(env, id, v.endpoint); return J({ ok: st >= 200 && st < 300, status: st }); } // sends one test push to the device that asks, nobody else
        if (p === '/test') { if (!env.ADMIN_KEY || u.searchParams.get('k') !== env.ADMIN_KEY) return J({ error: 'wrong key' }, 403); const n = await broadcast(env, [{ title: 'LLD Alerts', body: 'Test notification. It works!', url: '' }], { only: myFidOf(env) }); return J({ sent: n }); }
        if (p === '/faketrade') { if (!env.ADMIN_KEY || u.searchParams.get('k') !== env.ADMIN_KEY) return J({ error: 'wrong key' }, 403); const n = await broadcast(env, [{ type: 'offer', fid: '0002', title: 'Trade offer from Gotham Rogues (test)', body: 'They give: Bijan Robinson, 2027 round 2 pick \u2022 You give: Josh Allen', url: LEAGUE_URL(env) }], { only: myFidOf(env) }); return J({ sent: n }); }
        if (p === '/probe') { if (!env.ADMIN_KEY || u.searchParams.get('k') !== env.ADMIN_KEY) return J({ error: 'wrong key' }, 403); return J(await probe(env, u.searchParams.get('only'))); }
        if (p === '/check') { if (!env.ADMIN_KEY || u.searchParams.get('k') !== env.ADMIN_KEY) return J({ error: 'wrong key' }, 403); return J({ found: await poll(env) }); }
        // /sample?k=KEY&type=lineup  sends one made-up alert of that type (offer, trade, tx, lineup, preview, recap, board, tb); leave type off to send all eight.
        // It follows your checkboxes, so a type you switched off will not arrive.
        if (p === '/sample') {
          if (!env.ADMIN_KEY || u.searchParams.get('k') !== env.ADMIN_KEY) return J({ error: 'wrong key' }, 403);
          const S = {
            offer: { type: 'offer', fid: '0002', title: 'Trade offer from Pork Rolls', body: SHORT ? 'B. Robinson for J. Allen' : 'They give: Bijan Robinson \u2022 You give: Josh Allen', url: LEAGUE_URL(env) },
            trade: { type: 'trade', title: 'Trade completed', body: SHORT ? 'Taylor Hams \u21C4 Pork Rolls' : 'Taylor Hams \u21C4 Pork Rolls: Bijan Robinson for Josh Allen + 2027 R2', url: LEAGUE_URL(env) },
            tx: { type: 'tx', title: 'Juicebox added J. Warren', body: SHORT ? 'Free agent pickup' : 'Dropped T. Dell', url: LEAGUE_URL(env) },
            lineup: { type: 'lineup', title: 'Check your lineup', body: SHORT ? '2 problems' : '1 empty starting spot \u2022 C. Olave is ruled out', url: LEAGUE_URL(env) },
            preview: { type: 'preview', title: 'Matchup preview', body: SHORT ? 'Ready in your dashboard.' : 'This week\u2019s preview is ready in your dashboard.', url: LEAGUE_URL(env) },
            recap: { type: 'recap', title: 'Weekly recap', body: SHORT ? 'Ready in your dashboard.' : 'Last week\u2019s recap is ready in your dashboard.', url: LEAGUE_URL(env) },
            board: { type: 'board', title: 'Commissioner posted: Trade deadline', body: SHORT ? 'New message board post' : 'The deadline is Wednesday at 8 PM.', url: LEAGUE_URL(env) },
            tb: { type: 'tb', title: 'Best Budz updated their trade block', body: 'Status changed', url: LEAGUE_URL(env) }
          };
          const want = u.searchParams.get('type'); if (want && !S[want]) return J({ error: 'type must be one of: ' + Object.keys(S).join(', ') }, 400);
          const n = await broadcast(env, want ? [S[want]] : Object.values(S), { only: myFidOf(env) }); return J({ sent: n, type: want || 'all' });
        }
        // /lineupnow?k=KEY  runs the real lineup check on your team (add &fid=0003 for another owner's) right now (any day or time) and sends the alert if it finds a problem. Add &send=0 to look without sending.
        if (p === '/lineupnow') {
          if (!env.ADMIN_KEY || u.searchParams.get('k') !== env.ADMIN_KEY) return J({ error: 'wrong key' }, 403);
          const out = [], teams = await teamNames(env), fid = String(u.searchParams.get('fid') || myFidOf(env)).padStart(4, '0'), seen = await pollLineup(env, {}, f => teamLabel(teams[f] || ('Team ' + f)), out, true, [fid]);
          const sent = out.length && u.searchParams.get('send') !== '0' ? await broadcast(env, out) : 0; return J({ result: seen[fid], alerts: out.length, sent });
        }
        return J({ error: 'not found' }, 404);
      } catch (e) { return J({ error: 'alerts error' }, 500); }
    }
    try {
      if (p === '/login' && req.method === 'POST') return await login(req);
      if (p.startsWith('/mflapi/')) return await proxy(req, url, true);
      if (p.startsWith('/mfl/')) return await proxy(req, url, false);
    } catch (e) { return json(req, { ok: false, error: 'proxy error' }, 502); }
    return json(req, { ok: true, name: 'lld-worker' });
  },
  async scheduled(ev, env, ctx) { if (env.STATE) ctx.waitUntil(poll(env)); }
};
