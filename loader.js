/* LLD Dynasty loader — the ONLY thing a league footer needs to include:
   <script src="https://cdn.jsdelivr.net/gh/zewolff1/llddynasty@main/loader.js"></script>
   Pin a version per league with:  <script>window.LLD_VERSION='v1'</script> before the line above. */
(function () {
  var me = document.currentScript;
  window.toggleAdminMode = function () {
    var btn = document.getElementById('admin-toggle-btn');
    document.body.classList.toggle('admin-mode');
    var on = document.body.classList.contains('admin-mode');
    if (btn) { btn.innerHTML = on ? '\u2715' : '\u2699\uFE0F'; btn.style.background = on ? '#ff4444' : '#333'; }
  };
  // Add ?lld_debug=1 to the page URL to get a small "!" button that shows script errors you can copy.
  try { if (/[?&]lld_debug=1/.test(location.search)) localStorage.setItem('lld_debug', '1'); if (/[?&]lld_debug=0/.test(location.search)) localStorage.removeItem('lld_debug'); } catch (e) {}
  var dbg = false; try { dbg = localStorage.getItem('lld_debug') === '1'; } catch (e) {}
  if (dbg) {
    var errs = [];
    var show = function (t) { errs.push(t); if (errs.length > 15) errs.shift(); var b = document.getElementById('lld-dbg'); if (!b) { b = document.createElement('div'); b.id = 'lld-dbg'; b.style.cssText = 'position:fixed;left:8px;bottom:8px;z-index:2147483647;background:#b91c1c;color:#fff;font:700 12px/1.3 system-ui;padding:6px 10px;border-radius:14px;max-width:92vw'; b.onclick = function () { b.innerHTML = '<pre style="white-space:pre-wrap;margin:0;font:11px/1.3 monospace;max-height:50vh;overflow:auto">' + errs.join('\n\n').replace(/</g, '&lt;') + '</pre>'; }; document.body.appendChild(b); } b.textContent = '! ' + errs.length + ' error(s) - tap'; };
    window.addEventListener('error', function (e) { show((e.message || 'error') + ' @ ' + (e.filename || '').split('/').pop() + ':' + e.lineno); });
    window.addEventListener('unhandledrejection', function (e) { show('promise: ' + (e.reason && (e.reason.stack || e.reason.message) || e.reason)); });
  }
  var BASE = 'https://cdn.jsdelivr.net/gh/zewolff1/llddynasty@' + (window.LLD_VERSION || 'main') + '/';
  var m = location.href.match(/\/home\/(\d+)/) || location.href.match(/[?&]L=(\d+)/);
  var lid = m && m[1];
  if (!lid) return;
  function get(path, json) {
    return fetch(BASE + path).then(function (r) { if (!r.ok) throw new Error(path + ' ' + r.status); return json ? r.json() : r.text(); });
  }
  function addScript(src, cb) { var s = document.createElement('script'); s.src = src; if (cb) s.onload = cb; document.head.appendChild(s); }
  var needsShell = !document.querySelector('.main-page-wrapper');
  Promise.all([
    get('leagues/' + lid + '.json', true).catch(function () { console.warn('LLD: no config for league ' + lid); return {}; }),
    needsShell ? get('shell.html') : Promise.resolve('')
  ]).then(function (res) {
    window.LLD_CONFIG = Object.assign({ leagueId: lid }, res[0]);
    if (!document.querySelector('meta[name=viewport]')) { var v = document.createElement('meta'); v.name = 'viewport'; v.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'; document.head.appendChild(v); }
    var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = BASE + 'dashboard.css'; document.head.appendChild(css);
    if (res[1]) { if (me && me.parentNode) me.insertAdjacentHTML('beforebegin', res[1]); else document.body.insertAdjacentHTML('afterbegin', res[1]); }
    if (!document.querySelector('script[src*="kit.fontawesome"]')) { var fa = document.createElement('script'); fa.src = 'https://kit.fontawesome.com/ed60ff3657.js'; fa.crossOrigin = 'anonymous'; document.head.appendChild(fa); }
    var go = function () { addScript(BASE + 'dashboard.js'); };
    if (window.jQuery) go(); else addScript('https://code.jquery.com/jquery-3.7.1.min.js', go);
  });
})();
