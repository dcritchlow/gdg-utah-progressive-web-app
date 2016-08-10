toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-full-width",
    "preventDuplicates": false,
    "onclick": function(e){ console.log(e); },
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
            sendMessage(worker);
        }
    })
}

function sendMessage(){
    toastr.info(
        "A new version is available<br /><br /><button type='button' class='btn clear'>Update</button>",
        "Would you like to update?"
    );
}

// TODO: add function that will tell the service worker to skipWaiting when update btn clicked

navigator.serviceWorker.register('/sw.js').then(function(reg) {
    if(!navigator.serviceWorker.controller) return;

    if (reg.waiting){
        sendMessage();
        return;
    }

    if(reg.installing){
        trackChanges(reg.installing);
        return;
    }

    reg.addEventListener('updatefound', function(){
        trackChanges(reg.installing);
    });

}, function(err) {
    console.log('ಠ_ಠ', err);
});


// TODO: listen for the controlling service worker changing and reload the page