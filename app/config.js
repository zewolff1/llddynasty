// Edit this file only. Everything else in /app stays the same.
window.LLD_APP = {
  worker: 'https://lld-proxy.y9d7rsw57p.workers.dev',   // your deployed worker/lld-proxy.js
  alerts: 'https://lld-proxy.y9d7rsw57p.workers.dev',   // alerts now live in the same Worker as the proxy (worker/lld-proxy.js)
  leagueId: '63085',
  leagues: [{ id: '44478' }, { id: '62528' }],   // extra leagues (beta, only for franchises 0000 / 0001 of the main league); host and name come from MFL
  year: new Date().getFullYear(),
  host: 'www45.myfantasyleague.com',
  base: '../',                  // folder that holds dashboard js/css, shell.html and leagues/ (relative to /app/)
  script: 'dashboard-3.js',     // the dashboard file inside base
  css: 'dashboard.css'
};
