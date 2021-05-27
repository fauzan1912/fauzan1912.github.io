var CACHE_NAME = "my-site-cache-v1";

// File untuk disimpan dalam cachee
var urlsToChache = [
  "/",
  "/fallback.json",
  "/index.html",
  "/project.html",
  "/css/style.css",
  "/css/bootstrap.min.css",
  "/js/main.js",
  "/js/bootstrap.bundle.min.js",
  "/img/foto.png",
  "/img/p1.jpg",
  "/img/p2.jpg",
  "/img/p3.jpg",
  "/img/p4.jpg",
  "/img/p5.jpg",
];

// Menginstal service worker
self.addEventListener("install", function (event) {
  // Perform some task
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("in install serviceworker... cache opened!");
      return cache.addAll(urlsToChache);
    })
  );
});

// Menyimpan cache dan mengembalikan permintaan
self.addEventListener("fetch", function (event) {
  var request = event.request;
  var url = new URL(request.url);

  // Memisahkan request API dan Internal
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then(function (response) {
        return response || fetch(request);
      })
    );
  } else {
    event.respondWith(
      caches.open("project-cache").then(function (cache) {
        return fetch(request)
          .then(function (LiveResponse) {
            cache.put(request, LiveResponse.clone());
            return LiveResponse;
          })
          .catch(function () {
            return caches.match(request).then(function (response) {
              if (response) return response;
              return caches.match("/fallbax.json");
            });
          });
      })
    );
  }
});
// Mengupdate service worker
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return cacheName != CACHE_NAME;
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});
