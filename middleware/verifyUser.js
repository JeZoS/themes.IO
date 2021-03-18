const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const verifyToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.SECRET);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.send({ error: err });
    }
  } else {
    // res.send("401");
    console.log("Not authorized");
    res.json({ error: "Not authorized" });
  }
};

module.exports = verifyToken;
