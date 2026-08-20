
// ============================================
// STUDYPATH PWA - SERVICE WORKER
// Enables offline functionality
// ============================================

const CACHE_NAME = 'studypath-v1';
const ASSETS_TO_CACHE = [
    '/KevinAriasSolis.github.io/studypath/',
    '/KevinAriasSolis.github.io/studypath/index.html',
    '/KevinAriasSolis.github.io/studypath/styles.css',
    '/KevinAriasSolis.github.io/studypath/app.js',
    '/KevinAriasSolis.github.io/studypath/manifest.json',
    '/KevinAriasSolis.github.io/studypath/icon-192.png',
    '/KevinAriasSolis.github.io/studypath/icon-512.png'
];

// Instalar - cachear archivos
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activar - limpiar caches viejos
self.addEventListener('activate', function(event) {
    event.waitUntil
