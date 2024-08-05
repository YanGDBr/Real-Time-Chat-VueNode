const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true},
  from: { type: String, required: true },
  to: { type: String, required: true },
  timestamp: { type: Date, required: true }
});

module.exports = mongoose.model('Message', messageSchema, 'Messages');
