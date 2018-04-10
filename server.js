const fs = require('fs');
const express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// MongoDB Stuff //
var mongoose = require('mongoose');
var url = 'mongodb://user1:password@ds047602.mlab.com:47602/botes-dn';

mongoose.connect(url, function(error) {
    if (error) {
        console.log("Sorry Something Happened" + error);
    } else {
        console.log("Connected to MongoDB database.");
    }
});

var Schema = mongoose.model('Notes', {
    notes: String
});



// Express Routes //
app.use('/client', express.static('client/'));
app.use('/js', express.static('client/js'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
http.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started.");
});

console.log("Server is running!");

app.post('/submitNote', function (request, result) {
    console.log(request.body);
    var firstEntry = new Schema(request.body);

firstEntry.save(function(error){
    if (error) {
    console.log("Sorry, the document was not saved: + error");
    } else {
        console.log("Saved");
    }
});
    io.emit('message', request.body);
    result.send(200);
});