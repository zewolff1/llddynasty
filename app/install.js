/* "Add to Home Screen" walkthrough. Pops up by itself when the app is opened in a browser (not from the Home Screen icon).
   Test it anywhere by adding ?install=1 to the address. */
(function () {
  'use strict';
  var ua = navigator.userAgent || '', q = /[?&]install=1\b/.test(location.search);
  var standalone = navigator.standalone === true || (window.matchMedia && matchMedia('(display-mode: standalone)').matches);
  if (standalone && !q) return;
  var ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  var android = /Android/i.test(ua);
  if (!ios && !android && !q) return;                       // desktop browsers: nothing to install
  if (!q) { try { if (sessionStorage.getItem('lld_install_skip')) return; } catch (e) { } }
  var safari = ios && !/CriOS|FxiOS|EdgiOS|OPiOS|GSA\//.test(ua);
  var deferred = null;
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; var b = document.getElementById('lld-inst-go'); if (b) b.style.display = 'block'; });

  var SHARE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8"/></svg>';
  var PLUS = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/></svg>';
  var DOTS = '<svg width="22" height="22" viewBox="0 0 24 24" fill="#38bdf8"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>';
  function step(n, icon, html) { return '<li><span class="n">' + n + '</span><span class="t">' + html + '</span><span class="i">' + icon + '</span></li>'; }
  var steps;
  if (ios) {
    steps = (safari ? '' : step('!', '', 'Open this page in <b>Safari</b> first (tap the compass icon, or copy the link into Safari). Other browsers may not show the option.')) +
      step(1, SHARE, 'Tap the <b>Share</b> button' + (safari ? ' at the bottom of Safari' : '')) +
      step(2, PLUS, 'Scroll down and tap <b>Add to Home Screen</b>') +
      step(3, '', 'Tap <b>Add</b>, then open <b>LLD</b> from your Home Screen');
  } else {
    steps = step(1, DOTS, 'Tap the <b>menu</b> (three dots) in your browser') +
      step(2, PLUS, 'Tap <b>Install app</b> or <b>Add to Home screen</b>') +
      step(3, '', 'Open <b>LLD</b> from your Home Screen');
  }
  var css = '#lld-inst{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:flex-end;justify-content:center;background:rgba(2,6,14,.78);font-family:-apple-system,system-ui,sans-serif;-webkit-font-smoothing:antialiased}' +
    '#lld-inst .c{width:100%;max-width:460px;box-sizing:border-box;padding:22px 20px calc(22px + env(safe-area-inset-bottom,0px));background:#0f1626;border:1px solid #243049;border-radius:20px 20px 0 0;color:#e5e7eb;animation:lldin .35s ease-out}' +
    '@keyframes lldin{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}' +
    '#lld-inst h2{margin:0 0 4px;font-size:19px;color:#fff}#lld-inst p{margin:0 0 14px;font-size:13px;line-height:1.45;color:#94a3b8}' +
    '#lld-inst ol{list-style:none;margin:0 0 16px;padding:0;display:flex;flex-direction:column;gap:10px}' +
    '#lld-inst li{display:flex;align-items:center;gap:12px;padding:11px 12px;border-radius:12px;background:rgba(255,255,255,.05);font-size:14px;line-height:1.35}' +
    '#lld-inst .n{flex:none;width:24px;height:24px;border-radius:50%;background:#14b8a6;color:#04201d;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center}' +
    '#lld-inst .t{flex:1}#lld-inst .t b{color:#fff}#lld-inst .i{flex:none;display:flex}' +
    '#lld-inst button{width:100%;padding:13px;border-radius:12px;border:0;font-size:15px;font-weight:800}' +
    '#lld-inst-go{display:none;background:#14b8a6;color:#04201d;margin-bottom:8px}#lld-inst-skip{background:transparent;color:#94a3b8;font-weight:600 !important}';
  function show() {
    if (document.getElementById('lld-inst')) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var d = document.createElement('div'); d.id = 'lld-inst';
    d.innerHTML = '<div class="c"><h2>Add LLD to your Home Screen</h2><p>It opens like a real app, loads faster, and is the only way to get alerts on iPhone. Takes about 10 seconds.</p><ol>' + steps + '</ol>' +
      '<button type="button" id="lld-inst-go"' + (deferred ? ' style="display:block"' : '') + '>Install app</button><button type="button" id="lld-inst-skip">Not now, keep using the browser</button></div>';
    document.body.appendChild(d);
    document.getElementById('lld-inst-skip').onclick = function () { try { sessionStorage.setItem('lld_install_skip', '1'); } catch (e) { } d.remove(); };
    document.getElementById('lld-inst-go').onclick = function () { if (deferred) { deferred.prompt(); deferred = null; d.remove(); } };
  }
  if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
})();
