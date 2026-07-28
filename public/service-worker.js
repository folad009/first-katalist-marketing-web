// Clears any stale service worker registration for this origin.
// This app is not a PWA; the file exists so update checks return 200 instead of 404.

self.addEventListener("install", event => {
	event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
	event.waitUntil(
		(async () => {
			const cacheNames = await caches.keys();
			await Promise.all(cacheNames.map(name => caches.delete(name)));
			await self.registration.unregister();

			const clients = await self.clients.matchAll({ type: "window" });
			for (const client of clients) {
				client.navigate(client.url);
			}
		})()
	);
});
