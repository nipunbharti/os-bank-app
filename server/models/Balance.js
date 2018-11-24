const mongoose = require('mongoose');

const BalanceSchema = new mongoose.Schema({
  accountNo: {
    type: Number,
    default: ''
  },
  balance: {
    type: Number,
    default: ''
  }
});

module.exports = mongoose.model('Balance', BalanceSchema);