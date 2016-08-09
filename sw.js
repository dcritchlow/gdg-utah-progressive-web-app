console.log("SW startup");

self.addEventListener('install', function(event) {
    console.log("SW installed");
});

self.addEventListener('activate', function(event) {
    console.log("SW activated");
});

self.addEventListener('fetch', function(event) {
    console.log("Caught a fetch!");
    // Intercept fetch request and return a custom html response
    event.respondWith(
        new Response('Hello <b>World!</b>',
            { headers: { 'Content-Type': 'text/html' } }
        )
    );
});