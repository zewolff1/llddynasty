/* Adds the ⚙️ button that shows/hides MFL's own menus (CSS for it lives in dashboard.css). */
(function () {
  if (document.getElementById('admin-toggle-btn')) return;
  window.toggleAdminMode = function () {
    var btn = document.getElementById('admin-toggle-btn');
    document.body.classList.toggle('admin-mode');
    var on = document.body.classList.contains('admin-mode');
    btn.innerHTML = on ? '\u2715' : '\u2699\uFE0F';
    btn.style.background = on ? '#ff4444' : '#333';
  };
  var b = document.createElement('div');
  b.id = 'admin-toggle-btn';
  b.title = 'Toggle MFL Menus';
  b.innerHTML = '\u2699\uFE0F';
  b.onclick = window.toggleAdminMode;
  document.body.appendChild(b);
})();
