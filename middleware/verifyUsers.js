const db = require("../model");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
      username: req.body.username
    }).then((user) => {
      if (user) {
        res.status(400).send({ message: "Already registered Username!" });
        return;
      }
  
      // Email
      User.findOne({
        email: req.body.email
      }).then((user) => {
        if (user) {
          res.status(400).send({ message: "Already registered Email ID!" });
          return;
        }
  
        next();
      });
    });
  };

  const verifySignUp = {
    checkDuplicateUsernameOrEmail,
  };
  
  module.exports = verifySignUp;