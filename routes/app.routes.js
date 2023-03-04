const { verifySignUp } = require("../middleware");
const authJwt = require("../middleware/auth");
const controller = require("../controller/auth.controller");
const mainController = require("../controller/main.controller");
const express = require("express");
const app = express.Router();

    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.post("/api/auth/register",verifySignUp.checkDuplicateUsernameOrEmail,controller.register);
    
      app.post("/api/auth/login", controller.login);

      app.get("/getUsers", authJwt.verifyToken, mainController.getAll);

      app.post("/createPost", authJwt.verifyToken, mainController.createPost);

      app.get("/getAllPost", authJwt.verifyToken, mainController.getPost);

      app.get("/getPost/:longitude/:latitude", authJwt.verifyToken, mainController.getPostByLatLong);

      app.put("/updatePost/:id", authJwt.verifyToken, mainController.updatePost);

      app.delete("/deletePost/:id", authJwt.verifyToken, mainController.deletePost);

      app.get("/getCount", authJwt.verifyToken, mainController.getCount);



module.exports = app;
    


