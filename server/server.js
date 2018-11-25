var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path')
var db = require('./database/dbutils.js')
var request = require('request')

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


function fetchChatHistory(n) {
  // n is the number of items to fetch
  db.readChat({}, 3).then(() => {

  })
}

var port = process.env.PORT || 80;

// must set up the path for other files to render like css annd sw
app.use('/', express.static(path.join(__dirname, '/')));

server.listen(port);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile('/index.html');
});


app.get('/chats', function(req, res) {
  db.readChat({}).then((chats) => {
    res.send(chats)
  })
})


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
  // save msg to db
  var text = new db.ChatMsg({ msg: msg});
  db.saveChat(text)
  io.emit('chat msg', msg);
 });


 /// add default user as Anonynmous
socket.username = 'Anonynmous';
socket.on('change_usernname', (data) => {
  console.log(data)
  socket.username = data.username
})

});

