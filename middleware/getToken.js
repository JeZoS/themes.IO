const jwt = require("jsonwebtoken");

const genToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "5d",
  });
};

module.exports = genToken;
