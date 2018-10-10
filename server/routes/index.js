const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  require('./api/signup_login.js')(app)
  require('./api/room.js')(app)
};
