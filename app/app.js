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
    return realFetch(to, init).then(function (res) {
      remember(res);
      if (res.status === 200 && /^(401|403)$/.test(res.headers.get('X-MFL-Status') || '')) { /* session ended */ }
      return res;
    });
  };
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
  function start() {
    if (!session) return showLogin();
    $('#lld-app-login').style.display = 'none';
    $('#lld-app-boot').style.display = 'flex';
    window.franchise_id = session.fid;
    Promise.all([
      realFetch(C.base + 'leagues/' + C.leagueId + '.json', { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
      text('shell.html')
    ]).then(function (res) {
      window.LLD_CONFIG = Object.assign({ leagueId: C.leagueId }, res[0], { origin: C.worker + '/mfl' });
      var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = C.base + C.css + '?v=' + Math.floor(Date.now() / 120000); document.head.appendChild(css);
      document.body.insertAdjacentHTML('afterbegin', res[1]);
      var fa = document.createElement('script'); fa.src = 'https://kit.fontawesome.com/ed60ff3657.js'; fa.crossOrigin = 'anonymous'; document.head.appendChild(fa);
      script('https://code.jquery.com/jquery-3.7.1.min.js', function () {
        patchJquery();
        script(C.base + C.script + '?v=' + Math.floor(Date.now() / 120000), function () { $('#lld-app-boot').style.display = 'none'; });
      });
    }).catch(function (e) { showLogin('Could not start: ' + e.message); });
  }

  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(function () { });
  if (session) start(); else showLogin();
})();
