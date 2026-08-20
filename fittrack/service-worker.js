
var CACHE_NAME = 'fittrack-v3';
var ASSETS = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './icon-192.png',
    './icon-512.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(names) {
            return Promise.all(
                names.filter(function(name) {
                    return name !== CACHE_NAME;
                }).map(function(name) {
                    return caches.delete(name);
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    var url = event.request.url;

    // Never cache Firebase/Google API requests
    if (url.indexOf('googleapis.com') > -1 ||
        url.indexOf('firebase') > -1 ||
        url.indexOf('identitytoolkit') > -1 ||
        url.indexOf('firestore') > -1) {
        event.respondWith(fetch(event.request));
        return;
    }

    // Cache-first for app assets
    event.respondWith(
        caches.match(event.request).then(function(cached) {
            if (cached) return cached;
            return fetch(event.request).then(function(response) {
                if (response && response.status === 200) {
                    var clone = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, clone);
                    });
                }
                return response;
            });
        }).catch(function() {
            return caches.match('./index.html');
        })
    );
});

