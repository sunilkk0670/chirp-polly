'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "75d5800ab63de6d60958ced0513ce34e",
"assets/AssetManifest.bin.json": "4b3b881780017ebf7144656d1dc10fdb",
"assets/assets/data/curriculum/es_a1/es_a1_m01.json": "d51c1fac18c52a4fc9851b72db17b06c",
"assets/assets/data/curriculum/es_a1/es_a1_m02.json": "7c775064b67ccc1bb31ea564731b65d7",
"assets/assets/data/curriculum/es_a1/es_a1_m03.json": "9edd84fe8488af1410a843ed180d20f6",
"assets/assets/data/curriculum/es_a1/es_a1_m04.json": "4708087907e213fffbacc6898d301a62",
"assets/assets/data/curriculum/es_a1/es_a1_m05.json": "41db43d488ed4d097122b2460087c32a",
"assets/assets/data/curriculum/es_a1/es_a1_m06.json": "2aeccbf6c4ff6bda6a142bc37882efda",
"assets/assets/data/curriculum/es_a1/es_a1_m07.json": "6d9147acbdf70fde01f4c434c7db6d66",
"assets/assets/data/curriculum/es_a1/es_a1_m08.json": "e9d7c8d4ab213524838471bcf298bd9a",
"assets/assets/data/curriculum/es_a1/es_a1_m09.json": "f2e691dad05722ab7a3af75705ff468d",
"assets/assets/data/curriculum/es_a1/es_a1_m10.json": "cd7b0fa4a56d94faee31cb327e951f67",
"assets/assets/data/curriculum/es_a2/es_a2_m01.json": "0d20c3948c8fa7686e05a9b6d4c498da",
"assets/assets/data/curriculum/es_a2/es_a2_m02.json": "7300528f76b48ea5a767c042f496b7ba",
"assets/assets/data/curriculum/es_a2/es_a2_m03.json": "3919330c2f4a712971b2e5070cc2a86b",
"assets/assets/data/curriculum/es_a2/es_a2_m04.json": "9680d692ab80c5f2b35664514768fa0a",
"assets/assets/data/curriculum/es_a2/es_a2_m05.json": "fecb506b0380f1a03c7ac214f0eb5b52",
"assets/assets/data/curriculum/es_a2/es_a2_m06.json": "de8c66d4b6df1e5d593930a14903ac5e",
"assets/assets/data/curriculum/es_a2/es_a2_m07.json": "26b51d271a95608a6a10e2a7e9687056",
"assets/assets/data/curriculum/es_a2/es_a2_m08.json": "2f9ede49f7e52be82561e32b440dae6d",
"assets/assets/data/curriculum/es_a2/es_a2_m09.json": "3bc4a4b0e755ea88db9986df4383df20",
"assets/assets/data/curriculum/es_a2/es_a2_m10.json": "42fec2c8ed74264e1b3dc5b54ebad54a",
"assets/assets/data/curriculum/es_b1/es_b1_m01.json": "e77e9848f46ead28dca9e5d47eb71e56",
"assets/assets/data/curriculum/es_b1/es_b1_m02.json": "554b7fe6e4e74143e3dd58e33ebcb481",
"assets/assets/data/curriculum/es_b1/es_b1_m03.json": "ba77dfcee3f114b080568c396a7003d4",
"assets/assets/data/curriculum/es_b1/es_b1_m04.json": "886edaf86031a30d81295274d2e0aabb",
"assets/assets/data/curriculum/es_b1/es_b1_m05.json": "61ba250266e2363c66587b1f7676e230",
"assets/assets/data/curriculum/es_b1/es_b1_m06.json": "def4394646905bde1fdf59a43bf993ab",
"assets/assets/data/curriculum/es_b1/es_b1_m07.json": "851e8e4fd1bc0ee5fe2e7ab25d9a7501",
"assets/assets/data/curriculum/es_b1/es_b1_m08.json": "43c37287b60f9c3774d75267a380c410",
"assets/assets/data/curriculum/es_b1/es_b1_m09.json": "9acf4c95295cc9e512d8bacb39d437d2",
"assets/assets/data/curriculum/es_b1/es_b1_m10.json": "c1c62d7f965672bb7c7d5d190a9191d7",
"assets/assets/images/parrot_transparent.png": "9a6e5998cc39010ddb25a14013410e65",
"assets/assets/legal/privacy_policy.md": "925749cb26245a96e5f7e69563b131e0",
"assets/assets/legal/terms_of_service.md": "1148b99a1ccd213f21e643a806d61200",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "f7097106cc93d61243489018aa294286",
"assets/NOTICES": "f7ebc9f775ca0d846b4e44c5e93de280",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/shaders/stretch_effect.frag": "40d68efbbf360632f614c731219e95f0",
"canvaskit/canvaskit.js": "8331fe38e66b3a898c4f37648aaf7ee2",
"canvaskit/canvaskit.js.symbols": "a3c9f77715b642d0437d9c275caba91e",
"canvaskit/canvaskit.wasm": "9b6a7830bf26959b200594729d73538e",
"canvaskit/chromium/canvaskit.js": "a80c765aaa8af8645c9fb1aae53f9abf",
"canvaskit/chromium/canvaskit.js.symbols": "e2d09f0e434bc118bf67dae526737d07",
"canvaskit/chromium/canvaskit.wasm": "a726e3f75a84fcdf495a15817c63a35d",
"canvaskit/skwasm.js": "8060d46e9a4901ca9991edd3a26be4f0",
"canvaskit/skwasm.js.symbols": "3a4aadf4e8141f284bd524976b1d6bdc",
"canvaskit/skwasm.wasm": "7e5f3afdd3b0747a1fd4517cea239898",
"canvaskit/skwasm_heavy.js": "740d43a6b8240ef9e23eed8c48840da4",
"canvaskit/skwasm_heavy.js.symbols": "0755b4fb399918388d71b59ad390b055",
"canvaskit/skwasm_heavy.wasm": "b0be7910760d205ea4e011458df6ee01",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "24bc71911b75b5f8135c949e27a2984e",
"flutter_bootstrap.js": "d3fb3458f551f9adfa33a4b2307ac6c8",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "958dcfba0ba578cb0b7f441225d98d81",
"/": "958dcfba0ba578cb0b7f441225d98d81",
"main.dart.js": "9c8381bf8fa809cdb6b809098b672055",
"manifest.json": "882631951d1dca428fe17df9920d5750",
"version.json": "3c89a648d32e86a351a5e0fa588310d9"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
