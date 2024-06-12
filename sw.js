const cacheName = 'doom1plus2';

self.addEventListener('doom1plus2', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
      '/',
      '/d',
      '/index.html',
      '/d2',
      '/resources/js-dos/emulators-ui.js',
      '/resources/js-dos/js-dos.css',
      '/resources/js-dos/js-dos.js',
      '/resources/js-dos/wdosbox.js',
      '/resources/js-dos/wdosbox.wasm',
      '/resources/js-dos/zip-no-worker-inflate.min',
      '/resources/player.js',
      '/?bundleUrl=/d?anonymous=1',
      '/?bundleUrl=/d2?anonymous=1'
     ]);
   })
 );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    const cache = await caches.open('doom1plus2'); // cacheName
    const cachedResponse = await cache.match(event.request);
    const networkResponsePromise = fetch(event.request);

    event.waitUntil(async function() {
      const networkResponse = await networkResponsePromise;
      await cache.put(event.request, networkResponse.clone());
    }());

    // Returned the cached response if we have one, otherwise return the network response.
    return cachedResponse || networkResponsePromise;
  }());
});


//<script>
//if('serviceWorker' in navigator) {
  //navigator.serviceWorker
           //.register('/sw.js')
           //.then(function() { console.log("Service Worker Registered"); });
//}
//</script>
