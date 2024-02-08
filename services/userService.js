const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
exports.regigster = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, fullName } = req.body;
  let { password } = req.body;

  password = bcrypt.hashSync(password, 10);

  const user = await userModel.create({
    email: email,
    fullName: fullName,
    hash_password: password,
  });
  res.json({
    token: jwt.sign(
      { email: user.email, fullName: user.fullName, _id: user._id },
      "RESTFULAPIs"
    ),
  });
});

exports.sign_in = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email });
  if (user && bcrypt.compareSync(password, user.hash_password)) {
    res.json({
      token: jwt.sign(
        { email: user.email, fullName: user.fullName, _id: user._id },
        "RESTFULAPIs"
      ),
    });
  } else {
    return res.status(404).json("user email or password is not correct");
  }
});



exports.profile = asyncHandler(async (req, res, next) => {
  if (req.user) {
    res.send(req.user);
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
});
