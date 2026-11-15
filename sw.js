/* Wise Choice service worker — makes the app work fully offline.
   >>> When you change ANY app file, bump VERSION so installed apps pick up the update. <<< */
var VERSION = 'wisechoice-v1';
var ASSETS = ['./', 'index.html', 'style.css', 'app.js', 'manifest.webmanifest', 'data/manifest.js', 'data/2026_d9_s1.js',
  'logo.png', 'favicon.png', 'apple-touch-icon.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png',
  'samples/sample_questions.json', 'samples/sample_questions.csv', 'samples/AI_PROMPT.txt'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return Promise.all(ASSETS.map(function (a) { return c.add(a).catch(function () {}); })); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return /^wisechoice-/.test(k) && k !== VERSION; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('message', function (e) { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', function (e) {
  var r = e.request; if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  if (r.mode === 'navigate') { e.respondWith(caches.match('index.html').then(function (c) { return c || fetch(r); })); return; }
  e.respondWith(caches.match(r).then(function (c) {
    return c || fetch(r).then(function (res) { if (res.ok) { var cp = res.clone(); caches.open(VERSION).then(function (k) { k.put(r, cp); }); } return res; });
  }));
});
