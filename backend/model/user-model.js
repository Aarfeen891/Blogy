const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// user Schema

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  conPassword: {
    type: String,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "blog",
      required: true,
    },
  ],
});

// hash password

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashP = await bcrypt.hash(this.password, 10);
    this.password = hashP;
    this.conPassword = undefined;
  }
  next();
});

// user Model

const userModel = new mongoose.model("user", UserSchema);

module.exports = userModel;
