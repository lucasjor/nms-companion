// Stale-while-revalidate: works offline, picks up new versions on the next load.
const CACHE = "nms-companion";
const FILES = ["./", "index.html", "app.mjs", "logic.mjs", "library.json", "manifest.json", "icon.svg"];

self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES))));

self.addEventListener("fetch", (e) => {
  const net = caches.open(CACHE).then((cache) =>
    fetch(e.request).then(async (r) => {
      if (r.ok) await cache.put(e.request, r.clone());
      return r;
    }),
  );
  e.waitUntil(net.catch(() => {})); // keep the worker alive until the cache update lands
  e.respondWith(caches.match(e.request).then((hit) => hit || net));
});
