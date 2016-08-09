console.log("SW startup");

self.addEventListener('install', function(event) {
    console.log("SW installed");
});

self.addEventListener('activate', function(event) {
    console.log("SW activated");
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).then(function(response){
            if(response.status == 404){
                // TODO: instead, respond with the gif at
                // /images/mario.gif
                // using a network request
                return new Response("Whoops, not found");
            }
            return response;
        }).catch(function(){
            return new Response("Uh oh, that totally failed!");
        })
    );
});