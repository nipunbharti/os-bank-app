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

  app.post('/api/signUpJoint', function (req, res, next) {
    let {body} = req;
    let {userName1} = body;
    let {email1} = body;
    let {password1} = body;
    let {userName2} = body;
    let {email2} = body;
    let {password2} = body;
    var accountNo;
    if (!userName1) {
      return res.send({
        success: false,
        message: 'Error: userName cannot be blank.'
      });
    }
    if (!email1) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password1) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    if (!userName2) {
      return res.send({
        success: false,
        message: 'Error: userName cannot be blank.'
      });
    }
    if (!email2) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password2) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    email1 = email1.toLowerCase();
    email1 = email1.trim();

    email2 = email2.toLowerCase();
    email2 = email2.trim();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save

    User.find({
      userName: userName1
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

      newUser.userName = userName1;
      newUser.email = email1;
      newUser.password = newUser.generateHash(password1);
      newUser.save((err, user1) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
      User.find({
        userName: userName2
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

        newUser.userName = userName2;
        newUser.email = email2;
        newUser.password = newUser.generateHash(password2);
        newUser.save((err, user2) => {
          if (err) {
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          //
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
          //
          const newAccount1 = new Account();
          newAccount1.userName = user1.userName;
          newAccount1.accountNo = accountNo;

          newAccount1.save((err, account1) => {
            if (err) {
              return res.send({
                success: false,
                message: 'Error: Server error'
              });
            }

            const newAccount2 = new Account();
            newAccount2.userName = user2.userName;
            newAccount2.accountNo = accountNo;

            newAccount2.save((err, account2) => {
              if (err) {
                return res.send({
                  success: false,
                  message: 'Error: Server error'
                });
              }
              const newBalance = new Balance();
              newBalance.accountNo = account2.accountNo;
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
          })

        });
      });

      });
    });

  });


  app.post('/api/login', function (req, res, next) {
    let {body} = req;
    let {userName} = body;
    let {password} = body;

    if (!userName) {
      return res.send({
        success: false,
        message: 'Error: User Name cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }


    // Steps:
    // 1. Verify email exists
    // 2. Check if the password is correct

    User.find({
      userName: userName
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
      userSession.userName = user.userName;

      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        Account.find({
          userName: userName
        }, (err, accounts) => {
          if (err) {
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          } else if (accounts.length > 1) {
            return res.send({
              success: false,
              message: 'More than one Account Number is mapped to username'
            });
          }
          Balance.find({
            accountNo: accounts[0].accountNo
          }, (err,balances) => {
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
              username: accounts[0].userName,
              accountNo: accounts[0].accountNo,
              balance: balances[0].balance
            });

          });

      });

    });

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

    app.post('/api/lockdb', (req, res, next) => {
      let {body} = req;
      let {accountNo} = body;
      
      if(!accountNo) {
        return res.send({
          success: false,
          message: `Error: DB couldn't be locked`
        });
      }

      Balance.updateOne({
        accountNo: accountNo
      }, {$set: {mutex: true}}, (err, balance) => {
        if(err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }

        return res.send({
          success: true,
          message: `DB locked`,
        })
      })
    });

    app.post('/api/unlockdb', (req, res, next) => {
      let {body} = req;
      let {accountNo} = body;
      
      if(!accountNo) {
        return res.send({
          success: false,
          message: `Error: DB couldn't be unlocked`
        });
      }

      Balance.updateOne({
        accountNo: accountNo
      }, {$set: {mutex: false}}, (err, balance) => {
        if(err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }

        return res.send({
          success: true,
          message: `DB Unlocked`,
        })
      })
    });

    app.post('/api/getdetails', (req, res, next) => {
      let {body} = req;
      let {accountNo} = body;
      
      if(!accountNo) {
        return res.send({
          success: false,
          message: `Error: DB couldn't be locked`
        });
      }

      Balance.find({
        accountNo: accountNo
      }, (err, balance) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }

        return res.send({
          balance: balance
        });
      })
    });

    app.post('/api/withdrawl', (req, res, next) => {
      let {body} = req;
      let {accountNo} = body;
      let {value} = body;
      
      if(!accountNo) {
        return res.send({
          success: false,
          message: `Account No cant be empty`
        });
      }

      if(!value) {
        return res.send({
          success: false,
          message: `Value cant be empty`
        });
      }

      Balance.find({
        accountNo: accountNo
      }, (err, balance) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }

        let currentBalance = balance[0].balance;
        if(value > currentBalance) {
          return res.send({
            success: false,
            message: 'Withdrawl amount is more than current balance'
          });
        }
        Balance.updateOne({
          accountNo: accountNo
        }, {$set: {balance: currentBalance - value}}, (err, balance) => {
          if(err) {
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          return res.send({
            success: true,
            message: `Transaction Successful`,
            balance: currentBalance - value
          })
        })

      })
    });

    app.post('/api/credit', (req, res, next) => {
      let {body} = req;
      let {accountNo} = body;
      let {value} = body;
      
      if(!accountNo) {
        return res.send({
          success: false,
          message: `Account No cant be empty`
        });
      }

      if(!value) {
        return res.send({
          success: false,
          message: `Value cant be empty`
        });
      }

      Balance.find({
        accountNo: accountNo
      }, (err, balance) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }

        let currentBalance = balance[0].balance;
        Balance.updateOne({
          accountNo: accountNo
        }, {$set: {balance: currentBalance + value}}, (err, balance) => {
          if(err) {
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          return res.send({
            success: true,
            message: `Transaction Successful`,
            balance: currentBalance + value
          })
        })

      })
    });

};
