// Minimaler Service Worker für PWA-Support
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Ein gültiger Fetch-Handler ist zwingend für das App-Icon
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});