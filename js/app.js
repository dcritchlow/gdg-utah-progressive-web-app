toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-full-width",
    "preventDuplicates": false,
    "onclick": function(){refreshPage(_worker)},
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": 0,
    "extendedTimeOut": 0,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
    "tapToDismiss": false
}

var _worker = {};

function trackChanges(worker){
    worker.addEventListener('statechange', function(){
        if(worker.state == 'installed'){
            sendMessage(worker);
        }
    })
}

function sendMessage(worker){
    _worker = worker;
    toastr.info(
        "A new version is available<br /><br /><button type='button' class='btn clear'>Update</button>",
        "Would you like to update?"
    );
}

// TODO: add function that will tell the service worker to skipWaiting when update btn clicked
function refreshPage(worker){
    worker.postMessage({action: 'skipWaiting'});
}

navigator.serviceWorker.register('/sw.js').then(function(reg) {
    // TODO: if there's no controller, this page wasn't loaded
    // via a service worker, so they're looking at the latest version.
    // In that case, exit early
    if(!navigator.serviceWorker.controller) return;

    // TODO: if there's an updated worker already waiting, send a
    // message to the user
    if (reg.waiting){
        sendMessage(reg.waiting);
        return;
    }

    // TODO: if there's an updated worker installing, track its
    // progrees. It if becomes "installed", send a message to the user
    if(reg.installing){
        trackChanges(reg.installing);
        return;
    }

    // TODO: otherwise, listen for new installing workers arriving.
    // If one arrives, track its progress.
    // If it becomes "installed", send message to user
    reg.addEventListener('updatefound', function(){
        trackChanges(reg.installing);
    });
}, function(err) {
    console.log('ಠ_ಠ', err);
});


// TODO: listen for the controlling service worker changing and reload the page
navigator.serviceWorker.addEventListener('controllerchange', function(){
    window.location.reload();
});