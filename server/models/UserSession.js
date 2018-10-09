const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
  email: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);