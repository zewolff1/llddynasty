/* LLD Dynasty loader — the ONLY thing a league footer needs to include:
   <script src="https://cdn.jsdelivr.net/gh/zewolff1/llddynasty@main/loader.js"></script>
   Pin a version per league with:  <script>window.LLD_VERSION='v1'</script> before the line above. */
(function () {
  var me = document.currentScript;
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
