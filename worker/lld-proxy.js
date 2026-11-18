// LLD standalone proxy (Cloudflare Worker).
// Lets the standalone app (GitHub Pages) read and write MFL as the signed-in owner.
//   POST /login        { username, password, year, leagueId }  ->  { ok, cookie, franchiseId }
//   ANY  /mfl/<path>   -> https://<host>.myfantasyleague.com/<path>   (league pages, export, import)
//   ANY  /mflapi/<path>-> https://api.myfantasyleague.com/<path>        (api host)
// The app sends the MFL cookie in the X-MFL-Cookie header. Nothing is stored here; passwords are never logged.
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

export default {
  async fetch(req) {
    const url = new URL(req.url);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(req) });
    const o = req.headers.get('Origin');
    if (o && !ALLOW_ORIGINS.includes(o)) return json(req, { ok: false, error: 'origin not allowed' }, 403);
    try {
      if (url.pathname === '/login' && req.method === 'POST') return await login(req);
      if (url.pathname.startsWith('/mflapi/')) return await proxy(req, url, true);
      if (url.pathname.startsWith('/mfl/')) return await proxy(req, url, false);
    } catch (e) { return json(req, { ok: false, error: 'proxy error' }, 502); }
    return json(req, { ok: true, name: 'lld-proxy' });
  }
};
