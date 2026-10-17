const CACHE = "bigtext-v3";
const FILES = ["./", "./index.html", "./manifest.json", "./icon-180.png", "./icon-192.png", "./icon-512.png"];

// Safari refuses to show a cached response that came from a redirect, so store a clean copy.
async function clean(res) {
  if (!res.redirected) return res;
  const body = await res.blob();
  return new Response(body, { status: res.status, statusText: res.statusText, headers: res.headers });
}

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await Promise.all(FILES.map(async (f) => {
      const res = await fetch(new Request(f, { cache: "reload" }));
      if (!res.ok) throw new Error("Failed to cache " + f);
      await c.put(f, await clean(res));
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;

  // Opening the app: always serve the cached page, refresh it in the background.
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      const c = await caches.open(CACHE);
      const cached = (await c.match("./index.html")) || (await c.match("./"));
      const network = fetch(req).then(async (res) => {
        if (res.ok) await c.put("./index.html", await clean(res.clone()));
        return res;
      }).catch(() => null);
      if (cached) { e.waitUntil(network); return cached; }
      return (await network) || new Response("Offline", { status: 503 });
    })());
    return;
  }

  e.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) return cached;
    const res = await fetch(req);
    if (res.ok) { const c = await caches.open(CACHE); await c.put(req, await clean(res.clone())); }
    return res;
  })());
});
