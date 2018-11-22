var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path')


var port = process.env.PORT || 80;

// must set up the path for other files to render like css annd sw
app.use('/', express.static(path.join(__dirname, '/')));

server.listen(port);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile('/index.html');
});

// client side renndering
// app.use('/', express.static(path.join(__dirname, '../client')));
// app.get('/', (req, res) => res.send("anything"));

io.on('connection', function (socket) {
  console.log('a user connected');

 socket.on('disconnect', function(){
    console.log('user disconnected');
  });

 // first listen for a 'chat msg' and then send to everyone including sender
 socket.on('chat msg', (msg) => {
  io.emit('chat msg', msg);
 });
});