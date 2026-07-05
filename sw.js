const CACHE_NAME = 'grid-core-v7';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon.png'
];

// Installazione: scarica la cache e forza l'attivazione immediata
self.addEventListener('install', (e) => {
  self.skipWaiting(); // <-- Forza l'uscita dallo stato di "waiting"
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Attivazione: pulisce le vecchie cache e prende il controllo della pagina
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Se il nome della cache trovata è diverso da quello attuale, eliminala
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminazione vecchia cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // <-- Prende il controllo immediato delle schede aperte
  );
});

// Intercettazione: cerca in cache, altrimenti va in rete
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});