const mongoose = require('mongoose');

const PassbookSchema = new mongoose.Schema({
  accountNo: {
    type: Number,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  value: {
    type: Number,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },

});

module.exports = mongoose.model('Passbook', PassbookSchema);