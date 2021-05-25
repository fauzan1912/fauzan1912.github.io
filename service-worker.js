var CACHE_NAME = "static_cache";

//Files to save in cache
var STATIC_ASSETS = ["/", "/css/style.css", "/css/bootstrap.min.css", "/js/main.js", "/js/bootstrap.bundle.min.js", "/img/foto.png", "/img/p1.jpg", "/img/p2.jpg", "/img/p3.jpg", "/img/p4.jpg", "/img/p5.jpg"];

async function preCache() {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(STATIC_ASSETS);
}

self.addEventListener("install", (event) => {
  console.log("[SW] installed");
  event.waitUntil(preCache());
});
self.addEventListener("activate", (event) => {
  console.log("[SW] activated");
});

async function fetchAssets(event) {
  try {
    const response = await fetch(event.request);
    return response;
  } catch (err) {
    const cache = await caches.open(CACHE_NAME);
    return cache.match(event.request);
  }
}

self.addEventListener("fetch", (event) => {
  console.log("[SW] fetched");
  event.respondWith(fetchAssets(event));
});
