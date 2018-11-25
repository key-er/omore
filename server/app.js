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