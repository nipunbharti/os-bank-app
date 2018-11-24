const mongoose = require('mongoose');

const BalanceSchema = new mongoose.Schema({
  accountNo: {
    type: Number,
    default: ''
  },
  balance: {
    type: Number,
    default: ''
  },
  mutex: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Balance', BalanceSchema);