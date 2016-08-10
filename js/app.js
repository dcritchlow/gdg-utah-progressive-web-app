toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-full-width",
    "preventDuplicates": false,
    "onclick": function (e) { console.log(e); },
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

function trackChanges(worker){
    worker.addEventListener('statechange', function(){
        if(worker.state == 'installed'){
            sendMessage();
        }
    })
}

function sendMessage(){
    toastr.info("A new version is available<br /><br /><button type='button' class='btn clear'>Update</button>", "Would you like to update?");
}

navigator.serviceWorker.register('/sw.js').then(function(reg) {
    // TODO: if there's no controller, this page wasn't loaded
    // via a service worker, so they're looking at the latest version.
    // In that case, exit early
    if(!navigator.serviceWorker.controller) return;

    // TODO: if there's an updated worker already waiting, send a
    // message to the user
    if (reg.waiting){
        sendMessage();
        return;
    }

    // TODO: if there's an updated worker installing, track its
    // progrees. It if becomes "installed", send a message to the user
    if(reg.installing){
        // track changes reg.installing == worker
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