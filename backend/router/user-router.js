const express = require("express");
const {
  userSigup,
  allUsers,
  userLogin,
} = require("../controller/user-controller");

const userRouter = express.Router();

userRouter.route("/signup").post(userSigup);
userRouter.route("/").get(allUsers);
userRouter.route("/login").post(userLogin);

module.exports = userRouter;
