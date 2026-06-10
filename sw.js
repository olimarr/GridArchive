const CACHE_NAME = 'grid-core-v2';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon.png'
];

// Installazione e salvataggio file in cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Gestione delle richieste offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});