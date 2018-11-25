var mongoose = require('mongoose');
if (process.env.MONGOLAB_AQUA_URI) {
  mongoose.connect(MONGOLAB_AQUA_URI)
}
else {
  mongoose.connect('mongodb://localhost/omore');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});


var chatSchema = new mongoose.Schema({
  msg: String,
  user: String
});


var ChatMsg = mongoose.model('Chat', chatSchema);

module.exports = ChatMsg;
