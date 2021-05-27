$(document).ready(function () {
  // mengambil dari api yang telah di buat di github
  var _url = "https://my-json-server.typicode.com/fauzan1912/pwa-api/project";

  var dataResult = "";
  // Render page
  function renderPage(data) {
    $.each(data, function (key, items) {
      dataResult += `<div class="col-md-4 mb-3">
                <div class="card">
                  <img src="img/${items.gambar}" class="card-img-top" alt="project4" />
                  <div class="card-body">
                    <h5>${items.nama}</h5>
                    <h6>kategori : ${items.kategori}</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div>`;
    });
    $(".project-container").html(dataResult);
  }

  var networkDataReceived = false;

  //fresh data dari online
  var networkUpdate = fetch(_url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      networkDataReceived = true;
      renderPage(data);
    });

  // Mengembalikan data dari cache
  caches
    .match(_url)
    .then(function (response) {
      if (!response) throw Error("Tidak ada Data di Cache");
      return response.json();
    })
    .then(function (data) {
      if (!networkDataReceived) {
        renderPage(data);
        console.log("render data dari cache");
      }
    })
    .catch(function () {
      return networkUpdate;
    });

  //Fungsi Filter
  $("#car_select").on("change", function () {
    updateProduct($(this).val());
  });

  function updateProduct(x) {
    var dataResult = "";
    var _newUrl = _url;

    $.get(_newUrl, function (data) {
      $.each(data, function (key, items) {
        dataResult += `<div class="col-md-4 mb-3">
                <div class="card">
                  <img src="img/${items.gambar}" class="card-img-top" alt="project4" />
                  <div class="card-body">
                    <h5>${items.nama}</h5>
                    <h6>kategori : ${items.kategori}</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  </div>
                </div>
              </div>`;
      });
      $(".project-container").html(dataResult);
    });
  }
});

// PWA
// Mendaftarkan service worker
// Untuk menginstal service worker Anda perlu memulai prosesnya dengan mendaftarkannya di halaman. Pendaftaran ini akan memberi tahu browser tempat file JavaScript service worker Anda berada.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/service-worker.js").then(
      function (registration) {
        // Registration was successful
        console.log("ServiceWorker registration successful with scope: ", registration.scope);
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}
