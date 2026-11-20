/* LLD standalone app launcher.
   1. signs you in through the proxy worker (your MFL password is only used once; the app keeps MFL's session cookie)
   2. makes the dashboard think it is on MFL: sets franchise_id and sends every MFL request through the worker
   3. loads shell.html, dashboard.css, jQuery and the dashboard script from the repo */
(function () {
  'use strict';
  var C = window.LLD_APP, KEY = 'lld_app_session_v1';
  window.LLD_STANDALONE = true;
  var $ = function (s) { return document.querySelector(s); };
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { } }
  var session = load();
  /* past seasons: the season picker in Settings stores a year; the dashboard then uses it in every MFL address */
  (function () { var y = ''; try { y = localStorage.getItem('lld_app_year') || ''; } catch (e) { } var now = new Date().getFullYear(); if (/^\d{4}$/.test(y) && +y !== now) { window.LLD_YEAR = y; } window.LLD_SEASONS_READY = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017]; try { if (+y === now) localStorage.removeItem('lld_app_year'); } catch (e) { } })();

  /* commissioner <-> owner switch (MFL's own BECOME link), used by the Settings button */
  window.lldAppBecome = function (target) {
    var u = 'https://' + C.host + '/' + C.year + '/home/' + C.leagueId + '?BECOME=' + target;
    fetch(u).catch(function () { }).then(function () { if (session) { session.fid = target; save(session); } location.reload(); });
  };
  window.lldAppLogout = function () { try { localStorage.removeItem(KEY); } catch (e) { } location.reload(); };

  /* ---- 1. sign in ---- */
  function showLogin(msg) {
    $('#lld-app-boot').style.display = 'none';
    $('#lld-app-login').style.display = 'flex';
    $('#lld-app-err').textContent = msg || '';
  }
  $('#lld-app-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, btn = f.querySelector('button');
    btn.disabled = true; $('#lld-app-err').textContent = '';
    fetch(C.worker + '/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: f.username.value.trim(), password: f.password.value, year: C.year, leagueId: C.leagueId })
    }).then(function (r) { return r.json().catch(function () { return { ok: false, error: 'Bad answer from the proxy.' }; }); })
      .then(function (j) {
        btn.disabled = false;
        if (!j.ok) { $('#lld-app-err').textContent = j.error || 'Sign-in failed.'; return; }
        if (!j.franchiseId) { $('#lld-app-err').textContent = 'Signed in, but you do not have a team in league ' + C.leagueId + '.'; return; }
        session = { cookie: j.cookie, fid: j.franchiseId, at: Date.now() };
        save(session); f.password.value = ''; start();
      }).catch(function () { btn.disabled = false; $('#lld-app-err').textContent = 'Could not reach the proxy worker.'; });
  });

  /* ---- 2. send MFL traffic through the worker ---- */
  var MFL_RE = /^https?:\/\/(www\d+\.myfantasyleague\.com|api\.myfantasyleague\.com)(\/.*)?$/i;
  function rewrite(u) {
    u = String(u);
    if (u.indexOf(C.worker + '/mfl') === 0) return u;                       // already pointed at the worker (dashboard uses LLD.origin)
    var m = u.match(MFL_RE);
    if (m) return C.worker + (/^api\./i.test(m[1]) ? '/mflapi' : '/mfl') + (m[2] || '/');
    if (/^\/?\d{4}\/(export|import|options|csetup|standings|reports|message|trade_response|login|live|home)/.test(u)) return C.worker + '/mfl/' + u.replace(/^\//, '');  // MFL-style relative path
    return null;
  }
  var realFetch = window.fetch.bind(window);
  function remember(res) {
    var sc = res.headers && res.headers.get && res.headers.get('X-MFL-Set-Cookie');
    if (sc && session) { session.cookie = sc; save(session); }
    return res;
  }
  /* Share + retry: the dashboard asks MFL for the same thing many times at once (and MFL answers "429 too many requests").
     So identical GET requests made at the same moment share one answer, recent answers are reused for a short time,
     and a 429 is retried after a short wait instead of failing. Any write to MFL clears the saved answers. */
  var TTL = { league: 600000, rules: 3600000, allRules: 3600000, players: 3600000, nflByeWeeks: 3600000, nflSchedule: 300000, calendar: 300000, injuries: 120000, salaries: 60000, assets: 30000, futureDraftPicks: 30000, schedule: 120000, leagueStandings: 30000, weeklyResults: 60000, playerScores: 30000, projectedScores: 60000, tradeBait: 20000, messageBoard: 20000, transactions: 20000, rosters: 20000, liveScoring: 15000 };
  var DEFAULT_TTL = 10000, inflight = {}, saved = {};
  function kindOf(u) { var m = String(u).match(/[?&]TYPE=([A-Za-z]+)/i); return m ? m[1] : ''; }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function send(to, init, tries) {
    return realFetch(to, init).then(function (res) {
      if (res.status === 429 && tries < 3) return sleep(700 * Math.pow(2, tries) + Math.random() * 400).then(function () { return send(to, init, tries + 1); });
      return res;
    });
  }
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || String(input);
    var to = rewrite(url);
    if (!to) return realFetch(input, init);
    init = Object.assign({}, init || {});
    if (typeof input !== 'string' && input && input.method && !init.method) init.method = input.method;
    init.credentials = 'omit';
    var h = new Headers(init.headers || {});
    if (session) h.set('X-MFL-Cookie', session.cookie);
    h.set('X-MFL-Host', C.host);
    init.headers = h;
    var isGet = !init.method || String(init.method).toUpperCase() === 'GET', kind = isGet ? kindOf(url) : '', key = kind ? to + '|' + (session ? session.fid : '') : '';
    if (!isGet) { saved = {}; inflight = {}; }
    var finish = function (res) { remember(res); return res; };
    if (!key) {
      var msgBody = (!isGet && /\/\d{4}\/message(\?|$)/.test(url) && typeof init.body === 'string') ? init.body : null;
      return send(to, init, 0).then(finish).then(function (res) {
        if (msgBody) { var st = +(res.headers.get('X-MFL-Status') || res.status); if (res.ok && st < 400) trackMsg(msgBody); else console.warn('LLD app: MFL did not accept the message save (status ' + st + ')'); }
        return res;
      });
    }
    var hit = saved[key];
    if (hit && Date.now() - hit.t < (TTL[kind] || DEFAULT_TTL)) return Promise.resolve(new Response(hit.body, { status: 200, headers: { 'Content-Type': hit.ct } }));
    if (inflight[key]) return inflight[key].then(function (r) { return r.clone(); });
    var p = send(to, init, 0).then(finish).then(function (res) {
      if (res.status !== 200) return res;
      return res.clone().text().then(function (body) { saved[key] = { t: Date.now(), body: body, ct: res.headers.get('Content-Type') || 'application/json' }; return res; });
    });
    inflight[key] = p; var done = function () { delete inflight[key]; }; p.then(done, done);
    return p.then(function (r) { return r.clone(); });
  };
  /* ---- MFL message slots ----
     The dashboard keeps three shared settings in MFL message slots (team styles, Free Agent mode, re-sign window).
     On the MFL site those messages are part of the page, so the dashboard reads them off the page. The app's page is
     its own shell, so the app reads them from MFL's home page here and puts them in a hidden box the dashboard already looks at.
     The last values are kept on the phone so launch never waits on this. */
  var MSG_KEY = 'lld_app_msgs_v1', MSG_NAMES = ['FAMODE', 'RESIGNSTATE', 'TEAMSTYLES'], msgs = { v: {}, t: 0 };
  try { var m0 = JSON.parse(localStorage.getItem(MSG_KEY) || 'null'); if (m0 && m0.v) msgs = m0; } catch (e) { }
  function msgYear() { return String(window.LLD_YEAR || C.year); }
  function msgSave() { try { localStorage.setItem(MSG_KEY + '_' + msgYear(), JSON.stringify(msgs)); } catch (e) { } }
  function msgLoad() { msgs = { v: {}, t: 0 }; try { var m = JSON.parse(localStorage.getItem(MSG_KEY + '_' + msgYear()) || 'null'); if (m && m.v) msgs = m; } catch (e) { } }
  function msgPaint() {
    var d = document.getElementById('lld-mfl-msgs');
    if (!d) { d = document.createElement('div'); d.id = 'lld-mfl-msgs'; d.style.display = 'none'; document.body.appendChild(d); }
    d.innerHTML = MSG_NAMES.filter(function (k) { return msgs.v[k] !== undefined; }).map(function (k) { return '<!--' + k + ':' + msgs.v[k] + '-->'; }).join('');
  }
  function msgParse(s) {
    var o = {}, m;
    if ((m = s.match(/<!--FAMODE:(true|false)-->/))) o.FAMODE = m[1];
    if ((m = s.match(/<!--RESIGNSTATE:(true|false)-->/))) o.RESIGNSTATE = m[1];
    if ((m = s.match(/<!--TEAMSTYLES:([\s\S]*?)-->/))) o.TEAMSTYLES = m[1];
    return o;
  }
  function trackMsg(body) {            // the dashboard just saved a message slot: keep the app's copy in step
    try { var o = msgParse(new URLSearchParams(body).get('MSG') || ''); Object.keys(o).forEach(function (k) { msgs.v[k] = o[k]; }); msgs.t = Date.now(); msgSave(); msgPaint(); } catch (e) { }
  }
  function loadMsgs() {
    msgLoad(); msgPaint();
    if (Date.now() - msgs.t < 60000) return Promise.resolve();      // fetched in the last minute
    var wait = Object.keys(msgs.v).length ? 1200 : 3000;            // with saved values launch barely waits; the first time it waits a little longer
    var go = window.fetch('https://' + C.host + '/' + msgYear() + '/home/' + C.leagueId).then(function (r) { return r.ok ? r.text() : ''; }).then(function (html) {
      var o = msgParse(html); if (!Object.keys(o).length) return;
      Object.keys(o).forEach(function (k) { msgs.v[k] = o[k]; }); msgs.t = Date.now(); msgSave(); msgPaint();
    }).catch(function () { });
    return Promise.race([go, sleep(wait)]);
  }
  function patchJquery() {
    if (!window.jQuery || window.jQuery.__lldPatched) return;
    window.jQuery.__lldPatched = true;
    window.jQuery.ajaxPrefilter(function (opts, orig, xhr) {
      var to = rewrite(opts.url);
      if (!to) return;
      opts.url = to; opts.crossDomain = true; opts.xhrFields = { withCredentials: false };
      xhr.setRequestHeader('X-MFL-Cookie', session ? session.cookie : '');
      xhr.setRequestHeader('X-MFL-Host', C.host);
    });
  }

  /* ---- 3. boot the dashboard ---- */
  function text(path) { return realFetch(C.base + path, { cache: 'no-store' }).then(function (r) { if (!r.ok) throw new Error(path + ' ' + r.status); return r.text(); }); }
  function script(src, cb) { var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = function () { showLogin('Could not load ' + src); }; document.head.appendChild(s); }
  /* Loads fast: the big dashboard files are cached by the phone and only re-downloaded when version.json changes
     (version.json is tiny and always fetched fresh). Everything else loads in parallel instead of one after another. */
  function getVersion() {
    return realFetch(C.base + 'version.json', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (j) { return String(j.v || ''); }).catch(function () { return String(Math.floor(Date.now() / 600000)); });
  }
  function preload(href, as) { var l = document.createElement('link'); l.rel = 'preload'; l.as = as; l.href = href; document.head.appendChild(l); }
  var T0 = Date.now(), TM = {};
  window.LLD_BOOT = TM;
  function mark(k) { TM[k] = Date.now() - T0; }
  function start() {
    if (!session) return showLogin();
    $('#lld-app-login').style.display = 'none';
    $('#lld-app-boot').style.display = 'flex';
    window.franchise_id = session.fid;
    getVersion().then(function (v) {
      mark('version');
      var q = '?v=' + encodeURIComponent(v), js = C.base + C.script + q, cssUrl = C.base + C.css + q;
      preload(js, 'script'); preload(cssUrl, 'style');
      var jq = new Promise(function (ok) { script('https://code.jquery.com/jquery-3.7.1.min.js', ok); });
      return Promise.all([
        realFetch(C.base + 'leagues/' + C.leagueId + '.json' + q).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
        realFetch(C.base + 'shell.html' + q).then(function (r) { if (!r.ok) throw new Error('shell.html ' + r.status); return r.text(); }),
        jq,
        loadMsgs()
      ]).then(function (res) {
        mark('files');
        window.LLD_CONFIG = Object.assign({ leagueId: C.leagueId }, res[0], { origin: C.worker + '/mfl' });
        var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = cssUrl; document.head.appendChild(css);
        document.body.insertAdjacentHTML('afterbegin', res[1]);
        var fa = document.createElement('script'); fa.src = 'https://kit.fontawesome.com/ed60ff3657.js'; fa.crossOrigin = 'anonymous'; document.head.appendChild(fa);
        patchJquery();
        script(js, function () { mark('dashboard'); $('#lld-app-boot').style.display = 'none'; script('notify.js' + q, function () { }); });
      });
    }).catch(function (e) { showLogin('Could not start: ' + e.message); });
  }

  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js?w=' + encodeURIComponent(C.alerts || '')).catch(function () { });
  if (session) start(); else showLogin();
})();
