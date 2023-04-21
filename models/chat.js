const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: 'User'
  },
  other_users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [{
    text: {
      type: String,
      required: true
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    date: {
      type: Date,
      required: true
    }
  }]
});

module.exports = mongoose.model('Chat', chatSchema);
