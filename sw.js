console.log("SW startup");

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
        caches.open('devfestfam-static-v1').then(function(cache){      
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log("SW activated");
});

self.addEventListener('fetch', function(event) {
    // TODO: respond with an entry from the cache if there is one.
    // If there isn't, fetch from the network.
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response) return response;
            return fetch(event.request);
        })
    );
});