var staticCacheName = 'devfestfam-static-v2';

self.addEventListener('install', function(event) {
    var urlsToCache = [
        '/',
        'css/9-layout.css',
        'css/bootstrap.min.css',
        'css/jquery.bxslider.css',
        'css/jquery.magnificpopup.css',
        'css/mono-social-icons.css',
        'css/skin-57830b7bdca26.css',
        'css/style.css',
        'js/9-layout.js',
        'js/bootstrap.min.js',
        'js/jquery-migrate.min.js',
        'js/jquery.bxslider.min.js',
        'js/jquery.easing.1.3.js',
        'js/jquery.fitvids.js',
        'js/jquery.js',
        'js/jquery.magnificpopup.min.js',
        'js/jquery.mosaicflow.min.js',
        'js/jquery.throttle.min.js',
        'js/jquery.wookmark.min.js',
        'js/theme.js',
        'js/wp-embed.min.js',
    ];
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache){      
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function(cacheName){
                    return cacheName.startsWith('devfestfam-') &&
                        cacheName != staticCacheName;
                }).map(function(cacheName){
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response) return response;
            return fetch(event.request);
        })
    );
});

// TODO: listen for the "message" event, and call skipWaiting when appropriate