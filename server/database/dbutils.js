var ChatMsg = require('./db.js')

module.exports = {

  saveChat: (msgDocument) => {
    return new Promise((resolve, reject) => {
      msgDocument.save((err, msg) => {
        if (err) reject(err)
        else resolve(msg)
      })
    });
  },

  readChat: (filter, n) => {
    return new Promise((resolve, reject) => {
      // var query = ChatMsg.find(filter, null, { sort: { _id: -1 }, limit:n});
      var query = n ? ChatMsg.find(filter, null, {limit:n}):  ChatMsg.find(filter)
      var promise = query.exec();
      promise.then((c) => resolve(c))
    });
  },

  ChatMsg: ChatMsg
}




////////  test
// var ch = new ChatMsg({ msg: 'heyyyyyaa' });
// module.exports.saveChat(ch)

// module.exports.readChat({},2)
// .then((msgs) => {
//   console.log(msgs)
// })
// .catch((err) => console.log(err))

