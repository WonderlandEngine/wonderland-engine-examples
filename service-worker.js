const CacheName = 'NormalMaps-static-v1';
const files = [
    "index.html",

    "manifest.json",
    "WonderlandRuntime-LoadingScreen.bin",
    "WonderlandRuntime.wasm",
    "WonderlandRuntime.js",
    "WonderlandRuntime-simd.wasm",
    "WonderlandRuntime-simd.js",
    "WonderlandRuntime-threads.wasm",
    "WonderlandRuntime-threads.js",
    "WonderlandRuntime-threads.worker.js",
    "WonderlandRuntime-simd-threads.wasm",
    "WonderlandRuntime-simd-threads.js",
    "WonderlandRuntime-simd-threads.worker.js",
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CacheName).then(cache => cache.addAll(files) ));
});
self.addEventListener('activate', () => {
    console.log('Service worker initialized.');
});

self.addEventListener('fetch', e => {
    e.respondWith(
        (async () => {
            const r = await caches.match(e.request, {ignoreSearch: true});
            if (r) return r;

            const response = await fetch(e.request);
            const cache = await caches.open(CacheName);
            cache.put(e.request, response.clone());
            return response;
        })()
    );
});
