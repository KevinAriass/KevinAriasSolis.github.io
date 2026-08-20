
// ============================================
// STUDYPATH PWA - SERVICE WORKER
// Enables offline functionality
// ============================================

const CACHE_NAME = 'studypath-v1';
const ASSETS_TO_CACHE = [
    '/studypath/',
    '/studypath/index.html',
    '/studypath/styles.css',
    '/studypath/app.js',
    '/studypath/manifest.json',
    '/studypath/icon-192.png',
    '/studypath/icon-512.png'
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
