const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  userName: {
    type: String,
    default: ''
  },
  accountNo: {
    type: Number,
    default: ''
  }
});

module.exports = mongoose.model('Account', AccountSchema);