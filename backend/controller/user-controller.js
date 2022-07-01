const userModel = require("../model/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

const userSigup = async (req, res, next) => {
  try {
    const { name, email, password, conPassword } = req.body;

    const userEmail = await userModel.findOne({ email });
    if (userEmail) {
      throw new Error("This Email already exsit");
    } else if (password != conPassword) {
      throw new Error("Password is not matched with Confirm-Password");
    } else {
      const newUser = new userModel({
        name,
        email,
        password,
        conPassword,
        blogs: [],
      });

      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser._id),
        message: "User register Successfully",
      });
    }
  } catch (error) {
    error.status = "fail";
    error.statusCode = 400;
    next(error);
  }
};

const allUsers = async (req, res) => {
  try {
    const getAllUsers = await userModel.find();
    res.status(200).json({ getAllUsers });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userEmail = await userModel.findOne({ email });
    if (!userEmail) {
      throw new Error("Email and Password is not matched");
    }

    const compare = await bcrypt.compare(password, userEmail.password);
    if (compare) {
      return res.status(200).json({
        _id: userEmail._id,
        name: userEmail.name,
        email: userEmail.email,
        token: generateToken(userEmail._id),
        message: "Login Successfully",
      });
    } else {
      throw new Error("Email and Password is not matched");
    }
  } catch (err) {
    err.status = "fail";
    err.statusCode = 400;
    next(err);
  }
};

module.exports = { userSigup, allUsers, userLogin };
