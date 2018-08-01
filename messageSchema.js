const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: String,
  room: String
});

module.exports = mongoose.model('Message', messageSchema);