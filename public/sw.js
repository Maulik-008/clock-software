// Service Worker for StudyClock.com PWA
const CACHE_NAME = "studyclock-v2";
const STATIC_CACHE_NAME = "studyclock-static-v2";
const RUNTIME_CACHE_NAME = "studyclock-runtime-v2";

// Static assets to cache on install
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/manifest.json",
  "/og-image.svg",
  "/audio/alarm.mp3",
  "/audio/crystal.mp3",
];

// Install event - cache static resources
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log("[Service Worker] Caching static assets");
        return cache.addAll(
          STATIC_ASSETS.map((url) => new Request(url, { cache: "reload" }))
        );
      }),
      caches.open(RUNTIME_CACHE_NAME).then((cache) => {
        console.log("[Service Worker] Runtime cache ready");
        return cache;
      }),
    ]).catch((error) => {
      console.error("[Service Worker] Cache installation failed:", error);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName !== CACHE_NAME &&
            cacheName !== STATIC_CACHE_NAME &&
            cacheName !== RUNTIME_CACHE_NAME
          ) {
            console.log("[Service Worker] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Helper function to check if request is for static asset
function isStaticAsset(url) {
  return (
    url.includes("/assets/") ||
    url.includes(".js") ||
    url.includes(".css") ||
    url.includes(".png") ||
    url.includes(".jpg") ||
    url.includes(".svg") ||
    url.includes(".ico") ||
    url.includes("/audio/") ||
    url.includes("/manifest.json")
  );
}

// Helper function to check if request is for navigation
function isNavigationRequest(request) {
  return (
    request.mode === "navigate" ||
    (request.method === "GET" &&
      request.headers.get("accept").includes("text/html"))
  );
}

// Helper function to check if request is for API
function isAPIRequest(url) {
  return (
    url.includes("/api/") ||
    url.includes("emailjs") ||
    url.includes("analytics")
  );
}

// Fetch event - intelligent caching strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests and non-GET requests
  if (url.origin !== location.origin || request.method !== "GET") {
    return;
  }

  // Skip service worker and extension requests
  if (
    url.pathname.includes("/sw.js") ||
    url.pathname.includes("chrome-extension")
  ) {
    return;
  }

  event.respondWith(
    (async () => {
      try {
        // Strategy 1: Navigation requests (SPA routes) - Network first, fallback to cache
        if (isNavigationRequest(request)) {
          try {
            const networkResponse = await fetch(request);
            if (networkResponse.ok) {
              const cache = await caches.open(RUNTIME_CACHE_NAME);
              cache.put(request, networkResponse.clone());
              return networkResponse;
            }
          } catch (error) {
            console.log(
              "[Service Worker] Network failed for navigation, using cache"
            );
          }

          // Fallback to cached index.html for all routes (SPA)
          const cachedResponse = await caches.match("/index.html");
          if (cachedResponse) {
            return cachedResponse;
          }
        }

        // Strategy 2: Static assets - Cache first, fallback to network
        if (isStaticAsset(url.pathname)) {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }

          try {
            const networkResponse = await fetch(request);
            if (networkResponse.ok) {
              const cache = await caches.open(STATIC_CACHE_NAME);
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          } catch (error) {
            console.log(
              "[Service Worker] Failed to fetch static asset:",
              url.pathname
            );
            // Return a fallback if available
            if (url.pathname.includes("/audio/")) {
              return new Response("", { status: 404 });
            }
          }
        }

        // Strategy 3: API requests - Network first, don't cache failures
        if (isAPIRequest(url.pathname)) {
          try {
            const networkResponse = await fetch(request);
            return networkResponse;
          } catch (error) {
            console.log(
              "[Service Worker] API request failed (offline):",
              url.pathname
            );
            // Return a graceful error response for API calls
            return new Response(
              JSON.stringify({
                error: "Offline - request will be retried when online",
              }),
              {
                status: 503,
                headers: { "Content-Type": "application/json" },
              }
            );
          }
        }

        // Strategy 4: Default - Network first, cache on success
        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            const cache = await caches.open(RUNTIME_CACHE_NAME);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          // Try cache as fallback
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          throw error;
        }
      } catch (error) {
        console.error("[Service Worker] Fetch failed:", error);
        // Final fallback for navigation requests
        if (isNavigationRequest(request)) {
          const fallback = await caches.match("/index.html");
          if (fallback) {
            return fallback;
          }
        }
        throw error;
      }
    })()
  );
});

// Background sync for offline actions (optional enhancement)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-feedback") {
    event.waitUntil(syncFeedback());
  }
});

async function syncFeedback() {
  // This can be used to sync feedback submissions when back online
  console.log("[Service Worker] Syncing feedback...");
}
