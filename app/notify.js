/* Notifications panel for every owner (Settings > Team Settings).
   Turns on push for this phone, lets you pick which alerts you get, and sends a test. Alerts are for the team you are signed in as.
   Needs the alerts Worker (config.js: alerts). */
(function () {
  'use strict';
  var C = window.LLD_APP || {}, W = String(C.alerts || '').replace(/\/+$/, '');
  var KINDS = [['offer', 'Trade offers to me'], ['trade', 'Completed trades'], ['tx', 'Adds, drops and waivers'], ['lineup', 'Lineup problems'], ['preview', 'Matchup previews'], ['recap', 'Weekly recaps'], ['board', 'Message board posts'], ['tb', 'Trade block updates']];
  function isBeta() { var f = String(window.franchise_id || '').padStart(4, '0'); return f === '0000' || f === '0001'; }
  function u8(s) { var p = '='.repeat((4 - s.length % 4) % 4), b = atob((s + p).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(b, function (c) { return c.charCodeAt(0); }); }
  function idOf(sub) { return crypto.subtle.digest('SHA-256', new TextEncoder().encode(sub.endpoint)).then(function (h) { return Array.from(new Uint8Array(h)).map(function (x) { return x.toString(16).padStart(2, '0'); }).join('').slice(0, 24); }); }
  function reg() { return navigator.serviceWorker.getRegistration().then(function (r) { return r || navigator.serviceWorker.register('sw.js?w=' + encodeURIComponent(W)); }).then(function (r) { return navigator.serviceWorker.ready.then(function () { return r; }); }); }
  function box() { return document.getElementById('lld-notif-box'); }
  function say(m) { var e = document.getElementById('lld-nf-st'); if (e) e.textContent = m; }
  function cookie() { try { return (JSON.parse(localStorage.getItem('lld_app_session_v1') || '{}') || {}).cookie || ''; } catch (e) { return ''; } }
  // tells the Worker which phone this is and which team is signed in (the Worker checks the login with MFL and does not keep it)
  function sendSub(s) { var b = s.toJSON(); b.cookie = cookie(); return fetch(W + '/subscribe', { method: 'POST', body: JSON.stringify(b) }); }
  function can() { return W && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window; }

  function build() {
    var host = document.getElementById('tab-notif') || document.getElementById('tab-team-set'); if (!host || box()) return;
    var d = document.createElement('div'); d.id = 'lld-notif-box';
    d.style.cssText = 'margin:0 0 14px;padding:12px;border:1px solid var(--card-border);border-radius:10px;background:rgba(255,255,255,.04)';
    d.innerHTML = '<div style="font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:#f59e0b;margin-bottom:6px">Notifications</div>' +
      '<div id="lld-nf-boot" style="font-size:11px;color:var(--text-dim);margin-bottom:6px"></div>' +
      '<div id="lld-nf-st" style="font-size:12px;color:var(--text-dim);margin-bottom:8px"></div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px"><button type="button" id="lld-nf-on" class="lld-nf-b">Turn on</button><button type="button" id="lld-nf-test" class="lld-nf-b">Send test notification</button></div><select id="lld-nf-kind" class="lld-nf-b" style="margin-bottom:8px;width:100%"><option value="basic">Test type: Basic message</option><option value="offer">Trade offer to me</option><option value="trade">Completed trade</option><option value="tx">Add / drop / waiver</option><option value="lineup">Lineup problem</option><option value="preview">Matchup preview</option><option value="recap">Weekly recap</option><option value="board">Message board post</option><option value="tb">Trade block update</option></select>' +
      '<div id="lld-nf-pf" style="display:none;flex-direction:column;gap:6px">' + KINDS.map(function (k) { return '<label style="display:flex;gap:8px;align-items:center;font-size:12px;font-weight:700;color:#fff"><input type="checkbox" data-k="' + k[0] + '" checked> ' + k[1] + '</label>'; }).join('') + '</div>';
    host.insertBefore(d, host.firstChild);
    try { var t = window.LLD_BOOT || {}; if (isBeta()) document.getElementById('lld-nf-boot').textContent = 'Last launch: version check ' + (t.version || '?') + ' ms, files ' + (t.files || '?') + ' ms, dashboard loaded at ' + (t.dashboard || '?') + ' ms'; } catch (e) { }
    d.querySelectorAll('.lld-nf-b').forEach(function (b) { b.style.cssText = 'padding:8px 12px;border-radius:8px;border:1px solid #f59e0b;background:rgba(245,158,11,.12);color:#f59e0b;font-weight:900;font-size:11px;text-transform:uppercase'; });
    status();
  }
  function status() {
    if (!can()) { say(!W ? 'Notifications are not configured (config.js needs the alerts address).' : 'This browser cannot do push. On iPhone, open the app from the Home Screen icon.'); return; }
    reg().then(function (r) { return r.pushManager.getSubscription(); }).then(function (s) {
      say(s ? 'Notifications are ON for this phone.' : 'Notifications are off. Tap Turn on.');
      if (s) prefsLoad(s);
    }).catch(function (e) { say('Could not check: ' + e.message); });
  }
  function prefsLoad(sub) {
    idOf(sub).then(function (id) {
      return fetch(W + '/prefs?id=' + id).then(function (r) { return r.json(); }).then(function (j) {
        var p = j.prefs || {}, pf = document.getElementById('lld-nf-pf'); if (!pf) return;
        pf.querySelectorAll('input').forEach(function (i) { i.checked = p[i.dataset.k] !== undefined ? p[i.dataset.k] !== false : !(!isBeta() && (i.dataset.k === 'tx' || i.dataset.k === 'tb')); i.onchange = function () { var o = {}; pf.querySelectorAll('input').forEach(function (x) { o[x.dataset.k] = x.checked; }); fetch(W + '/prefs?id=' + id, { method: 'POST', body: JSON.stringify(o) }).catch(function () { say('Could not save your choices.'); }); }; });
        pf.style.display = 'flex';
      });
    }).catch(function () { });
  }
  // ask for permission (must come from a tap), subscribe this phone and tell the Worker. `report` shows progress; resolves true when on.
  function turnOn(report) {
    if (!can()) { report && report(!W ? 'Notifications are not configured.' : 'This browser cannot do push. On iPhone, open the app from the Home Screen icon.'); return Promise.resolve(false); }
    report && report('Turning on…');
    return reg().then(function (r) {
      return Notification.requestPermission().then(function (perm) {
        if (perm !== 'granted') throw new Error('permission was not granted (allow notifications for this app in iPhone Settings)');
        return fetch(W + '/vapid').then(function (x) { return x.json(); }).then(function (v) {
          if (!v.key) throw new Error('the alerts Worker gave no key');
          return r.pushManager.getSubscription().then(function (s) { return s || r.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: u8(v.key) }); });
        });
      });
    }).then(function (s) { return sendSub(s).then(function () { report && report('Notifications are ON for this phone.'); try { prefsLoad(s); } catch (e) { } return true; }); })
      .catch(function (err) { report && report('Could not turn on: ' + err.message); return false; });
  }

  // ---- ask once the app is open from the Home Screen and alerts are not on yet ----
  var SNOOZE = 'lld_notif_snooze', DAY = 864e5;
  function standalone() { return navigator.standalone === true || (window.matchMedia && matchMedia('(display-mode: standalone)').matches); }
  function ask() {
    if (document.getElementById('lld-nf-ask')) return;
    var d = document.createElement('div'); d.id = 'lld-nf-ask';
    d.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:2147482000;display:flex;justify-content:center;padding:0 12px calc(12px + env(safe-area-inset-bottom,0px));font-family:-apple-system,system-ui,sans-serif';
    d.innerHTML = '<div style="width:100%;max-width:460px;box-sizing:border-box;padding:16px;border-radius:16px;background:#0f1626;border:1px solid #243049;box-shadow:0 10px 40px rgba(0,0,0,.6);color:#e5e7eb">' +
      '<div style="font-size:16px;font-weight:800;color:#fff;margin-bottom:4px">Turn on alerts?</div>' +
      '<div id="lld-nf-ask-t" style="font-size:13px;line-height:1.45;color:#94a3b8;margin-bottom:12px">Get a notification for trade offers, lineup problems, matchup previews and more. You can pick which ones in Settings.</div>' +
      '<div style="display:flex;gap:8px"><button type="button" id="lld-nf-ask-on" style="flex:1;padding:12px;border-radius:10px;border:0;background:#14b8a6;color:#04201d;font-weight:800;font-size:15px">Turn on</button>' +
      '<button type="button" id="lld-nf-ask-no" style="flex:none;padding:12px 14px;border-radius:10px;border:0;background:transparent;color:#94a3b8;font-weight:600;font-size:14px">Not now</button></div></div>';
    document.body.appendChild(d);
    document.getElementById('lld-nf-ask-no').onclick = function () { try { localStorage.setItem(SNOOZE, String(Date.now() + 3 * DAY)); } catch (e) { } d.remove(); };
    document.getElementById('lld-nf-ask-on').onclick = function () {
      var t = document.getElementById('lld-nf-ask-t');
      turnOn(function (m) { t.textContent = m; }).then(function (ok) { if (ok) setTimeout(function () { d.remove(); }, 1500); });
    };
  }
  function maybeAsk() {
    try {
      if (!can() || !standalone() || !cookie()) return;
      if (Notification.permission === 'denied') return;
      var until = +localStorage.getItem(SNOOZE) || 0; if (until > Date.now()) return;
      reg().then(function (r) { return r.pushManager.getSubscription(); }).then(function (s) {
        if (s) return;
        if (Notification.permission === 'granted') { turnOn(); return; }   // allowed before but the subscription is gone: restore it quietly
        ask();
      }).catch(function () { });
    } catch (e) { }
  }
  setTimeout(maybeAsk, 3500);

  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('#lld-nf-on, #lld-nf-test') : null; if (!t) return;
    if (t.id === 'lld-nf-on') {
      turnOn(say);
    } else {
      say('Sending test…');
      reg().then(function (r) { return r.pushManager.getSubscription().then(function (s) {
        if (!s) throw new Error('turn notifications on first');
        return idOf(s).then(function (id) { return fetch(W + '/testme?id=' + id + '&kind=' + encodeURIComponent((document.getElementById('lld-nf-kind') || {}).value || 'basic')).then(function (x) { return x.json().catch(function () { return {}; }); }).then(function (j) {
          if (j && j.ok) { say('Test sent. It should arrive in a few seconds.'); return; }
          // alerts Worker is older than this app (no /testme yet): still prove this phone can show notifications
          return r.showNotification('LLD Alerts', { body: 'Local test: this phone can show notifications. (Update the alerts Worker for a full end-to-end test.)', icon: 'icon-192.png' }).then(function () { say('Showed a local test. The alerts Worker needs the new version for a full test.'); });
        }); });
      }); }).catch(function (err) { say('Test failed: ' + err.message); });
    }
  });
  // every launch: if this phone already has alerts on, tell the Worker which team is signed in (so alerts follow the right owner)
  try { if (can() && Notification.permission === 'granted') reg().then(function (r) { return r.pushManager.getSubscription(); }).then(function (s) { if (s) return sendSub(s); }).catch(function () { }); } catch (e) { }
  // build the panel whenever Settings opens
  document.addEventListener('click', function (e) { if (e.target && e.target.closest && e.target.closest('.open-settings-btn')) { setTimeout(build, 350); setTimeout(build, 1200); } }, true);
  document.addEventListener('touchend', function (e) { if (e.target && e.target.closest && e.target.closest('.open-settings-btn')) { setTimeout(build, 350); setTimeout(build, 1200); } }, true);
})();
