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

function refreshPage(worker){
    worker.postMessage({action: 'skipWaiting'});
}

navigator.serviceWorker.register('sw.js').then(function(reg) {
    if(!navigator.serviceWorker.controller) return;

    if (reg.waiting){
        sendMessage(reg.waiting);
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


navigator.serviceWorker.addEventListener('controllerchange', function(){
    window.location.reload();
});