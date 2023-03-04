const config = process.env.SECRET_KEY;
const db = require("../model");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const register = (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    User.create(user).then((newUser) => {
        console.log('Registered===');
        return res.status(200).json({
            message: 'Successfully registerd!',
            data: newUser
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({
            message: 'Something went wrong, please try again.'
        });
    });

    // user.save((err, user) => {
    //     if (err) {
    //       res.status(500).send({ message: err });
    //       return;
    //     }
    //     user.save(err => {
    //         if (err) {
    //           res.status(500).send({ message: err });
    //           return;
    //         }

    //         res.send({ message: "Registered Successfully !!!" });
    //       });
    //     }
    //   );

}

const login = (req, res) => {
    User.findOne({
      username: req.body.username
    }).then((user) => {
        if (!user) 
          return res.status(404).send({ message: "User Not found." });

  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user }, config, {
          expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken: token
        });
      });
  };

module.exports = { register, login }