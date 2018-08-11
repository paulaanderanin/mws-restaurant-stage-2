const version = '1';
const cacheName = `restaurant-${version}`;

self.addEventListener('install', function (e){
	//what to cache
	const urlsToCache = [
		'/img/1.jpg',
		'/img/2.jpg',
		'/img/3.jpg',
		'/img/4.jpg',
		'/img/5.jpg',
		'/img/6.jpg',
		'/img/7.jpg',
		'/img/8.jpg',
		'/img/9.jpg',
		'/img/10.jpg',
		'/index.html',
		'/js/main.js',
		'/js/restaurant_info.js',
		'/css/styles.css',
		'/manifest.json'
	];
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll(urlsToCache)
				.then(() => self.skipWaiting());
		})
	);

});
self.addEventListener('activate', event => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.open(cacheName)
			.then(cache => cache.match(event.request, {ignoreSearch: false}))
			.then(response => {
				return response || fetch(event.request);
			}).catch(function() {
				return caches.match('/index.html');
			})
	);
});
