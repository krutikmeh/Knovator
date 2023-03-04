const jwt = require("jsonwebtoken");
const db = require("../model");
const User = db.user;
const config = process.env.SECRET_KEY;

exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, config, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.user = decoded.id;
      next();
    });
  };