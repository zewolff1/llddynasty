// LLD app service worker: lets the app install to the Home Screen and shows league alerts (push).
// A push carries no text; the phone wakes this worker, which asks the alerts Worker what happened.
const WORKER = decodeURIComponent(new URL(self.location.href).searchParams.get('w') || '');
async function myId() { const s = await self.registration.pushManager.getSubscription(); if (!s) return ''; const h = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s.endpoint))); return [...h].map(x => x.toString(16).padStart(2, '0')).join('').slice(0, 24); }
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
self.addEventListener('push', e => e.waitUntil((async () => {
  let msgs = [];
  try { if (WORKER) { const r = await fetch(WORKER + '/latest?id=' + await myId()); msgs = (await r.json()).msgs || []; } } catch (x) { }
  if (!msgs.length) msgs = [{ title: 'LLD Dynasty', body: 'Something new happened in the league.', url: '' }];
  for (const m of msgs) await self.registration.showNotification(m.title, { body: m.body, icon: 'icon-192.png', badge: 'icon-192.png', data: { url: m.url || '' } });
})()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if ('focus' in c) return c.focus(); }   // already open: just bring it forward
    return clients.openWindow(self.registration.scope);
  }));
});
