import { timestamp, files, shell } from "@sapper/service-worker";

const assets = `cache${timestamp}`;
const to_cache = shell.concat(files);
const cached = new Set(to_cache);

function is_dev_url(url, context) {
    return (
        url.hostname === context.location.hostname &&
        url.port !== context.location.port
    );
}

self.addEventListener("install", (event) => {
    const wait_for = caches
        .open(assets)
        .then((cache) => {
            cache.addAll(to_cache);
        })
        .then(() => {
            self.skipWaiting();
        });
    event.waitUntil(wait_for);
});

self.addEventListener("activate", (event) => {
    const wait_for = caches.keys().then(async (keys) => {
        for (const key of keys) {
            if (key !== assets) {
                await caches.delete(key);
            }
        }
        self.clients.claim();
    });
    event.waitUntil(wait_for);
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET" || event.request.headers.has("range")) {
        return;
    }
    const url = new URL(event.request.url);
    if (!url.protocol.startsWith("http") || is_dev_url(url, self)) {
        return;
    }
    if (url.host === self.location.host && cached.has(url.pathname)) {
        event.respondWith(caches.match(event.request));
        return;
    }
    if (event.request.cache === "only-if-cached") {
        return;
    }
    const response = caches.open(`offline${timestamp}`).then(async (cache) => {
        try {
            const response = await fetch(event.request);
            cache.put(event.request, response.clone());
            return response;
        } catch (err) {
            const response = await cache.match(event.request);
            if (response) {
                return response;
            }
            throw err;
        }
    });
    event.respondWith(response);
});
