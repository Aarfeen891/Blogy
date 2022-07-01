const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "Aarfeen", { expiresIn: "30d" });
};

module.exports = { generateToken };
