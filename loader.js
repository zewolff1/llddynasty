/* LLD Dynasty loader. A league footer only needs:

   <script>
   window.LLD_VERSION = 'abc1234';      // commit to run (copy of the pin below)
   window.LLD_BACKUP  = 'def5678';      // a commit you know works; used if the new one fails to load or start
   window.LLD_CONFIG  = { leagueId: '63085', tradeDeadline: '...', resignOpen: false, faMode: false };   // only what you change from MFL
   </script>
   <script src="https://cdn.jsdelivr.net/gh/zewolff1/llddynasty@abc1234/loader.js"></script>

   Everything else comes from leagues/<leagueId>.json (the same file the Home Screen app reads). Anything in the footer's
   window.LLD_CONFIG wins over that file. Add ?lld_debug=1 to the page URL for the small "!" error button (lld_debug=0 turns it off). */
(function () {
  var CFG = window.LLD_CONFIG || {};
  var NEW = window.LLD_VERSION || 'main', OLD = window.LLD_BACKUP || '';
  var B = 'https://cdn.jsdelivr.net/gh/zewolff1/llddynasty@', KEY = 'lld_use_backup_until', useOld = false;
  try { useOld = !!OLD && +localStorage.getItem(KEY) > Date.now(); } catch (e) { }
  var BASE = B + (useOld ? OLD : NEW) + '/';
  var m = location.href.match(/\/home\/(\d+)/) || location.href.match(/[?&]L=(\d+)/);
  var lid = CFG.leagueId || (m && m[1]);
  if (!lid) return;

  try { if (/[?&]lld_debug=1/.test(location.search)) localStorage.setItem('lld_debug', '1'); if (/[?&]lld_debug=0/.test(location.search)) localStorage.removeItem('lld_debug'); } catch (e) { }
  var dbg = false; try { dbg = localStorage.getItem('lld_debug') === '1'; } catch (e) { }
  if (dbg) {
    var errs = [];
    var show = function (t) {
      errs.push(t); if (errs.length > 15) errs.shift();
      var b = document.getElementById('lld-dbg');
      if (!b) { b = document.createElement('div'); b.id = 'lld-dbg'; b.style.cssText = 'position:fixed;left:8px;bottom:8px;z-index:2147483647;background:#7f1d1d;color:#fff;font:12px monospace;padding:6px 9px;border-radius:8px;max-width:90vw'; document.body.appendChild(b); }
      b.textContent = '! ' + errs.join(' | ');
    };
    window.addEventListener('error', function (e) { show((e.message || 'error') + ' @ ' + (e.filename || '').split('/').pop() + ':' + e.lineno); });
    window.addEventListener('unhandledrejection', function (e) { show('promise: ' + (e.reason && (e.reason.stack || e.reason.message) || e.reason)); });
  }

  function addScript(src, ok, bad) { var s = document.createElement('script'); s.src = src; if (ok) s.onload = ok; if (bad) s.onerror = bad; document.head.appendChild(s); }
  function backup() {
    if (useOld || !OLD) return;
    console.warn('LLD: new version failed, switching to backup ' + OLD);
    try { localStorage.setItem(KEY, String(Date.now() + 30 * 60 * 1000)); location.reload(); }
    catch (e) { useOld = true; addScript(B + OLD + '/dashboard-3.js', function () { addScript(B + OLD + '/admin-toggle.js'); }); }
  }

  fetch(BASE + 'leagues/' + lid + '.json')
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .catch(function () { console.warn('LLD: no league file for ' + lid); return {}; })
    .then(function (file) {
      window.LLD_CONFIG = Object.assign({ leagueId: lid }, file || {}, CFG);     // footer wins
      if (!document.querySelector('meta[name=viewport]')) { var v = document.createElement('meta'); v.name = 'viewport'; v.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'; document.head.appendChild(v); }
      var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = BASE + 'dashboard.css'; document.head.appendChild(css);
      if (!document.querySelector('script[src*="kit.fontawesome"]')) { var fa = document.createElement('script'); fa.src = 'https://kit.fontawesome.com/ed60ff3657.js'; fa.crossOrigin = 'anonymous'; document.head.appendChild(fa); }
      var go = function () {
        addScript(BASE + 'dashboard-3.js', function () {
          addScript(BASE + 'admin-toggle.js');
          if (!useOld) setTimeout(function () { if (!window.LLD_BOOTED) backup(); }, 30000);
        }, backup);
      };
      if (window.jQuery) go(); else addScript('https://code.jquery.com/jquery-3.7.1.min.js', go);
    });
})();
