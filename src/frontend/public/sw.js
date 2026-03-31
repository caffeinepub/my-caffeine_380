// Service Worker - Offline-first for Naosheen Broadband Internet
const CACHE_NAME = 'naosheen-bb-v7';

// ── IndexedDB helpers (SW has no localStorage) ──────────────────────────────
const IDB_NAME = 'naosheen-pwa-store';
const IDB_STORE = 'settings';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = (e) => e.target.result.createObjectStore(IDB_STORE);
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = () => reject(req.error);
  });
}

async function getIDB(key) {
  try {
    const db = await openDB();
    return await new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (_) {
    return null;
  }
}

// ── Build dynamic manifest ──────────────────────────────────────────────────
async function buildManifestResponse() {
  const iconDataUrl = await getIDB('pwa_icon_512');
  const icons = iconDataUrl
    ? [
        { src: '/dynamic-icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
        { src: '/dynamic-icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
      ]
    : [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
      ];
  const manifest = {
    name: '\u09A8\u0993\u09B6\u09C0\u09A8 \u09AC\u09CD\u09B0\u09A1\u09AC\u09CD\u09AF\u09BE\u09A8\u09CD\u09A1 \u0987\u09A8\u09CD\u099F\u09BE\u09B0\u09A8\u09C7\u099F',
    short_name: '\u09A8\u0993\u09B6\u09C0\u09A8 BB',
    description: 'ISP Management System - Delta Software & Communication Limited',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#1e40af',
    orientation: 'portrait-primary',
    offline_capable: true,
    prefer_related_applications: false,
    icons
  };
  return new Response(JSON.stringify(manifest), {
    status: 200,
    headers: { 'Content-Type': 'application/manifest+json' }
  });
}

// ── Serve custom icon from IndexedDB ───────────────────────────────────────
async function buildIconResponse(idbKey) {
  const iconDataUrl = await getIDB(idbKey || 'pwa_icon_192');
  if (!iconDataUrl) return fetch('/icon-192.png');
  try {
    const [meta, b64] = iconDataUrl.split(',');
    const mimeMatch = meta.match(/data:([^;]+)/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    return new Response(bytes.buffer, {
      status: 200,
      headers: { 'Content-Type': mime }
    });
  } catch (_) {
    return fetch('/icon-192.png');
  }
}

// ── Lifecycle ──────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch handler ──────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (event.request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // Dynamic manifest — match pathname with or without query params
  if (url.pathname.startsWith('/manifest.json')) {
    event.respondWith(buildManifestResponse().catch(() => fetch(event.request)));
    return;
  }

  // Dynamic PWA icon 192
  if (url.pathname === '/dynamic-icon-192.png') {
    event.respondWith(buildIconResponse('pwa_icon_192'));
    return;
  }

  // Dynamic PWA icon 512
  if (url.pathname === '/dynamic-icon-512.png') {
    event.respondWith(buildIconResponse('pwa_icon_512'));
    return;
  }

  // ICP canister API calls — network first
  if (
    url.hostname.includes('.ic0.app') ||
    url.hostname.includes('.icp0.io') ||
    url.pathname.startsWith('/api/')
  ) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({ error: 'offline' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  // JS/CSS/fonts/images — cache first, update in background
  if (
    url.origin === self.location.origin &&
    url.pathname.match(/\.(js|css|woff2?|ttf|eot|otf|png|svg|ico|jpg|jpeg|webp|gif)$/)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(event.request).then((cached) => {
          const networkFetch = fetch(event.request).then((response) => {
            if (response && response.status === 200)
              cache.put(event.request, response.clone());
            return response;
          }).catch(() => cached);
          return cached || networkFetch;
        })
      )
    );
    return;
  }

  // HTML navigation — network first
  if (
    event.request.mode === 'navigate' ||
    event.request.headers.get('accept')?.includes('text/html')
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then((cache) =>
              cache.put(event.request, response.clone())
            );
          }
          return response;
        })
        .catch(() => caches.match('/index.html') || caches.match('/'))
    );
    return;
  }

  // Default: network first, cache fallback
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          caches.open(CACHE_NAME).then((cache) =>
            cache.put(event.request, response.clone())
          );
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
