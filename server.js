const fs = require('fs');
const express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Express Routes //
app.use('/client', express.static('client/'));
app.use('/js', express.static('client/js'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
http.listen(8080);

console.log("Server is running!");

app.post('/submitNote', function (request, result) {
    console.log(request.body);
});