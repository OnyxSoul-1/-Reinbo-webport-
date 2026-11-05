const CACHE_NAME = 'reinbo-cache-v1';
const PARTS_TO_CACHE = [
  './index.js',
  './index.pck.part1', './index.pck.part2', './index.pck.part3', 
  './index.pck.part4', './index.pck.part5', './index.pck.part6', 
  './index.pck.part7', './index.pck.part8', './index.pck.part9',
  './index.wasm.part1', './index.wasm.part2', './index.wasm.part3'
];

// Install: Download all parts and save to Chromebook storage
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PARTS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Fetch: Serve from cache if offline, otherwise fetch
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
