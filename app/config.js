// Edit this file only. Everything else in /app stays the same.
window.LLD_APP = {
  worker: 'https://lld-proxy.y9d7rsw57p.workers.dev',   // your deployed worker/lld-proxy.js
  leagueId: '63085',
  year: new Date().getFullYear(),
  host: 'www45.myfantasyleague.com',
  base: '../',                  // folder that holds dashboard js/css, shell.html and leagues/ (relative to /app/)
  script: 'dashboard-3.js',     // the dashboard file inside base
  css: 'dashboard.css'
};
