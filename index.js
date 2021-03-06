var express = require('express');
var app = express();
var http = require('http').Server(app);

const staticOptions = {
    maxAge: 0
};

app.use("/sw.js", express.static(__dirname + '/sw.js', staticOptions));
app.use('/images', express.static(__dirname + '/images', staticOptions));
app.use('/img/bxslider', express.static(__dirname + '/img/bxslider', staticOptions));
app.use('/js', express.static(__dirname + '/js', staticOptions));
app.use('/css', express.static(__dirname + '/css', staticOptions));
app.use('/js/toastr.min.js', express.static(__dirname + '/node_modules/toastr/build/toastr.min.js', staticOptions));
app.use('/css/toastr.min.css', express.static(__dirname + '/node_modules/toastr/build/toastr.min.css', staticOptions));
app.use('/manifest.json', express.static(__dirname + '/manifest.json', staticOptions));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/devfestfam.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});