var express = require('express');
var app = express();
var http = require('http').Server(app);

const staticOptions = {
    maxAge: 0
};

app.use("/sw.js", express.static(__dirname + '/sw.js', staticOptions));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/devfestfam.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});