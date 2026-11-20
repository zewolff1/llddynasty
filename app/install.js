/* "Add to Home Screen" walkthrough. Pops up by itself when the app is opened in a browser (not from the Home Screen icon).
   Test it anywhere by adding ?install=1 to the address. */
(function () {
  'use strict';
  var C = window.LLD_APP || {}, KEY = 'lld_app_icon', ICON = null;
  function sget(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function sset(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
  // point the Home Screen icon (iPhone and Android) at an image. Must happen before the person taps Add to Home Screen.
  function setIcon(dataUrl) {
    ICON = dataUrl;
    document.querySelectorAll('link[rel="apple-touch-icon"],link[rel="apple-touch-icon-precomposed"],link[rel="icon"]').forEach(function (e) { e.remove(); });
    ['apple-touch-icon', 'icon'].forEach(function (rel) { var l = document.createElement('link'); l.rel = rel; l.sizes = '180x180'; l.type = 'image/png'; l.href = dataUrl; document.head.appendChild(l); });
    try { // Android installs from the manifest, so give it one that carries the chosen icon
      var base = location.href.replace(/[?#].*$/, '').replace(/[^/]*$/, '');
      var m = { name: 'LLD Dynasty', short_name: 'LLD', start_url: base, scope: base, display: 'standalone', background_color: '#070b14', theme_color: '#070b14', icons: [{ src: dataUrl, sizes: '192x192', type: 'image/png' }, { src: dataUrl, sizes: '512x512', type: 'image/png' }] };
      var url = URL.createObjectURL(new Blob([JSON.stringify(m)], { type: 'application/manifest+json' }));
      var old = document.querySelector('link[rel="manifest"]'); if (old) old.remove();
      var l = document.createElement('link'); l.rel = 'manifest'; l.href = url; document.head.appendChild(l);
    } catch (e) { }
  }
  function leagueIcon() { return fetch('icon-180.png').then(function (r) { return r.blob(); }).then(blobToUrl); }
  function blobToUrl(b) { return new Promise(function (res) { var f = new FileReader(); f.onload = function () { res(f.result); }; f.readAsDataURL(b); }); }
  // a team logo from MFL (through the Worker) drawn onto a square white icon
  function teamIcon(fid) {
    var y = C.year, u = C.worker + '/mfl/fflnetdynamic' + y + '/' + C.leagueId + '_franchise_logo' + fid + '.png';
    return fetch(u).then(function (r) { if (!r.ok) throw 0; return r.blob(); }).then(function (b) {
      return new Promise(function (res, rej) {
        var img = new Image(), o = URL.createObjectURL(b);
        img.onload = function () {
          var c = document.createElement('canvas'); c.width = c.height = 180; var x = c.getContext('2d');
          x.fillStyle = '#fff'; x.fillRect(0, 0, 180, 180);
          var k = Math.min(148 / img.width, 148 / img.height), w = img.width * k, h = img.height * k;
          x.drawImage(img, (180 - w) / 2, (180 - h) / 2, w, h); URL.revokeObjectURL(o); res(c.toDataURL('image/png'));
        };
        img.onerror = rej; img.src = o;
      });
    });
  }
  function applyChoice(choice) { // 'league' or a franchise id
    if (!choice || choice === 'league') return leagueIcon().then(setIcon);
    return teamIcon(choice).then(setIcon).catch(function () { return leagueIcon().then(setIcon).then(function () { return 'nologo'; }); });
  }
  var saved = sget(KEY); if (saved && saved !== 'league') applyChoice(saved);

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
    '#lld-inst .pk{display:flex;align-items:center;gap:14px;margin-bottom:12px}#lld-inst .big{width:64px;height:64px;border-radius:14px;background:#fff;overflow:hidden;flex:none}#lld-inst .big img{width:100%;height:100%;object-fit:cover;display:block}' +
    '#lld-inst .po{display:flex;gap:8px}#lld-inst .po button{flex:1;width:auto;padding:10px 6px;border-radius:10px;border:2px solid #243049;background:#16203a;color:#e5e7eb;font-size:13px;font-weight:700}#lld-inst .po button[aria-pressed=true]{border-color:#14b8a6}' +
    '#lld-pk-s{width:100%;margin-bottom:8px;padding:11px;border-radius:10px;border:1px solid #243049;background:#16203a;color:#fff;font-size:16px}#lld-pk-m{min-height:0;margin:0 0 10px;font-size:12px;color:#94a3b8}' +
    '#lld-inst-go{display:none;background:#14b8a6;color:#04201d;margin-bottom:8px}#lld-inst-skip{background:transparent;color:#94a3b8;font-weight:600 !important}';
  var PICK = '<div class="pk"><div class="big" id="lld-pk-big"></div><div style="flex:1"><div class="po"><button type="button" id="lld-pk-l" aria-pressed="true">League logo</button><button type="button" id="lld-pk-t" aria-pressed="false">My team</button></div></div></div><select id="lld-pk-s" style="display:none"><option value="">Pick your team…</option></select><div id="lld-pk-m"></div>';
  var teams = null;
  function loadTeams() {
    if (teams) return Promise.resolve(teams);
    return fetch(C.worker + '/mfl/' + C.year + '/export?TYPE=league&L=' + C.leagueId + '&JSON=1').then(function (r) { return r.json(); }).then(function (j) {
      var f = (j.league && j.league.franchises && j.league.franchises.franchise) || []; if (!Array.isArray(f)) f = [f];
      teams = f.map(function (x) { return { id: x.id, name: x.name }; }).sort(function (a, b) { return a.name.localeCompare(b.name); }); return teams;
    });
  }
  function wirePicker() {
    var big = document.getElementById('lld-pk-big'), bl = document.getElementById('lld-pk-l'), bt = document.getElementById('lld-pk-t'), sel = document.getElementById('lld-pk-s'), msg = document.getElementById('lld-pk-m');
    function show(url) { big.innerHTML = url ? '<img alt="" src="' + url + '">' : ''; }
    function press(t) { bl.setAttribute('aria-pressed', t === 'l'); bt.setAttribute('aria-pressed', t === 't'); sel.style.display = t === 't' ? 'block' : 'none'; msg.textContent = ''; }
    function league() { press('l'); sset(KEY, 'league'); applyChoice('league').then(function () { show(ICON); }); }
    bl.onclick = league;
    bt.onclick = function () {
      press('t'); msg.textContent = 'Loading teams…';
      loadTeams().then(function (t) { sel.innerHTML = '<option value="">Pick your team…</option>' + t.map(function (x) { return '<option value="' + x.id + '">' + String(x.name).replace(/</g, '&lt;') + '</option>'; }).join(''); msg.textContent = ''; var sv = sget(KEY); if (sv && sv !== 'league') { sel.value = sv; if (sel.value) sel.onchange(); } })
        .catch(function () { msg.textContent = 'Could not load the team list. The league logo will be used.'; });
    };
    sel.onchange = function () {
      if (!sel.value) return; msg.textContent = 'Loading logo…';
      sset(KEY, sel.value);
      applyChoice(sel.value).then(function (r) { show(ICON); msg.textContent = r === 'nologo' ? 'That team has no logo on MFL yet, so the league logo will be used.' : 'This icon will be saved when you add the app.'; });
    };
    var sv = sget(KEY); if (sv && sv !== 'league') bt.onclick(); else (ICON ? Promise.resolve() : applyChoice('league')).then(function () { show(ICON); });
  }
  function show() {
    if (document.getElementById('lld-inst')) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var d = document.createElement('div'); d.id = 'lld-inst';
    d.innerHTML = '<div class="c"><h2>Add LLD to your Home Screen</h2><p>It opens like a real app, loads faster, and is the only way to get alerts on iPhone. Takes about 10 seconds.</p>' + PICK + '<ol>' + steps + '</ol>' +
      '<button type="button" id="lld-inst-go"' + (deferred ? ' style="display:block"' : '') + '>Install app</button><button type="button" id="lld-inst-skip">Not now, keep using the browser</button></div>';
    document.body.appendChild(d);
    wirePicker();
    document.getElementById('lld-inst-skip').onclick = function () { try { sessionStorage.setItem('lld_install_skip', '1'); } catch (e) { } d.remove(); };
    document.getElementById('lld-inst-go').onclick = function () { if (deferred) { deferred.prompt(); deferred = null; d.remove(); } };
  }
  if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
})();
