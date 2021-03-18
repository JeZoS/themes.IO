const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const genToken = require("../middleware/getToken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ error: "Invalid Creds" });
    } else {
      if (await bcrypt.compare(password, user.password)) {
        // console.log('success')
        res.json({
          id: user._id,
          username: user.username,
          token: genToken(user._id),
        });
      } else {
        res.json({
          error: "Invalid Creds",
        });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const registerUser = async (req, res) => {
  var { email, password, username } = req.body;
  try {
    const nuser = await User.findOne({ email });
    const userNameUser = await User.findOne({ username });
    if (nuser) {
      res.send({
        error: "User with email already exists",
      });
    } else if (userNameUser) {
      res.send({
        error: "Username not available",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const user = new User({
        email,
        password,
        username,
      });
      const createdUser = await user.save();
      res.send({
        id: createdUser._id,
        username: createdUser.username,
        token: genToken(user._id),
      });
    }
  } catch (err) {
    res.send({ error: err });
  }
};

module.exports = { loginUser, registerUser };
