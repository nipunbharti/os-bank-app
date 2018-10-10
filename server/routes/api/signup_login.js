const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {

  app.post('/api/signUp', function (req, res, next) {
    let {body} = req;
    let {userName} = body;
    let {email} = body;
    let {password} = body;

    if (!userName) {
      return res.send({
        success: false,
        message: 'Error: userName cannot be blank.'
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    email = email.toLowerCase();
    email = email.trim();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save

    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }

      // Save the new user
      const newUser = new User();

      newUser.userName = userName;
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Signed up'
        });
      });
    });

  });

  app.post('/api/login', function (req, res, next) {
    let {body} = req;
    let {email} = body;
    let {password} = body;

    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    email = email.toLowerCase();
    email = email.trim();

    // Steps:
    // 1. Verify email exists
    // 2. Check if the password is correct

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Password didnt match'
        });
      }
      // Create a Session for user
      const userSession = new UserSession();
      userSession.email = user.email;

      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id,
        });
      })

    });

  });

  app.get('/api/logout', (req, res, next) => {
      const {query} = req;
      const {token} = query;

      UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
      }, {
        $set: {
          isDeleted:true
        }
      }, null, (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }

        return res.send({
          success: true,
          message: 'Successfully Logged out'
        });
      });
    });


};
