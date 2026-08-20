
// ============================================
// FITTRACK PWA - SERVICE WORKER
// ============================================

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
    event
