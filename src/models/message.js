const mongoose = require("mongoose");
const messagedb = new mongoose.Schema({
  content: String,
  room: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messagedb);

module.exports = Message;
