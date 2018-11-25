

function fetchChatFromDB(cb) {
  fetch('/chats')
  .then(function(response) {
    return response.json();
  })
  .then(function(chats) {
   cb(chats)
  });
}



fetchChatFromDB((chats) => {
  chats.forEach((chat) => {
    console.log(chat.msg)
    $('#messages').append($('<li>').text(chat.msg))
  })
})



if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then((registration) => {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch((err) => {
    console.log('ServiceWorker registration failed: ', err);
  })
};

var socket = io.connect('http://localhost');
var chat = {username:'', msg:''}
$(() => {
  var socket = io();
  $('form').submit(() => {
    // send out value of the input box
    socket.emit('chat msg', $('#m').val());
    $('#m').val(''); // clear out input box after submitting text
    return false;
  })
  socket.on('chat msg', function (msg) {
    //// fix this
    ////// https://medium.com/@noufel.gouirhate/build-a-simple-chat-app-with-node-js-and-socket-io-ea716c093088
    $('#messages').append($('<li>').text($('#whoami').val()) + ':' + $('<li>').text(msg))
  });


  $('#usernameBtn').click(() => {
    console.log('clicked submit username, emitting evennt....')
    socket.emit('change_username', {username: $('#whoami').val()})
  })

})
