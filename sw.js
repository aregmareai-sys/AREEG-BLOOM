const C = "areej-life-v1";
self.addEventListener("install", (e) => { e.waitUntil(caches.open(C).then((c) => c.addAll(["./", "./index.html", "./manifest.json", "./icon-180.png", "./icon-192.png", "./icon-512.png"]))); self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== C).map((k) => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  // app shell: network first (gets updates), falls back to cache offline
  e.respondWith(fetch(e.request).then((r) => { const copy = r.clone(); if (r.ok || r.type === "opaque") caches.open(C).then((c) => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request).then((m) => m || caches.match("./index.html"))));
});
