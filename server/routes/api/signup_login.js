const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const Account = require('../../models/Account');
const Balance = require('../../models/Balance');
const Passbook = require('../../models/Passbook');

module.exports = (app) => {

  app.post('/api/signUpSingle', function (req, res, next) {
    let {body} = req;
    let {userName} = body;
    let {email} = body;
    let {password} = body;
    var accountNo;
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
      userName: userName
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
      while(1) {
        var found = 0;
        accountNo = Math.floor(100000 + Math.random() * 900000);
        Account.find({
          accountNo: accountNo
        }, (err, accounts) => {
          if (err) {
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          if (accounts.length != 0) {
            found = 1;
          }
        });
        if(found == 0)
          break;
      }
      const newAccount = new Account();
      newAccount.userName = user.userName;
      newAccount.accountNo = accountNo;

      newAccount.save((err, account) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }

        const newBalance = new Balance();
        newBalance.accountNo = account.accountNo;
        newBalance.balance = 0;

        newBalance.save((err, balance) => {
          if (err) {
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          return res.send({
            success: true,
            message: 'Signed up',
            accountNo:  balance.accountNo
          });

        })
      })

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
          email: doc.email
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
