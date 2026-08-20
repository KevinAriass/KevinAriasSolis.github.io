
const CACHE_NAME = 'fittrack-v1';
const ASSETS_TO_CACHE = [
    '/KevinAriasSolis.github.io/fittrack/',
    '/KevinAriasSolis.github.io/fittrack/index.html',
    '/KevinAriasSolis.github.io/fittrack/styles.css',
    '/KevinAriasSolis.github.io/fittrack/app.js',
    '/KevinAriasSolis.github.io/fittrack/manifest.json',
    '/KevinAriasSolis.github.io/fittrack/icon-192.png',
    '/KevinAriasSolis.github.io/fittrack/icon-512.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) return response;
            return fetch(event.request).then(function(networkResponse) {
                if (networkResponse && networkResponse.status === 200) {
                    var responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            });
        }).catch(function() {
            return caches.match('/KevinAriasSolis.github.io/fittrack/index.html');
        })
    );
});

