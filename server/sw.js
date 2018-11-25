var cacheName = 'shell-contentv7';
var filesToCache = [
  '/index.html',
  '/index.css',
  '/images/',
  '/'
];

self.addEventListener('activate', function(event) {
  // to delete all caches except following
  var cacheWhitelist = ['shell-contentv2', 'shell-contentv3', 'shell-contentv7'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});



self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install')
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache)
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});