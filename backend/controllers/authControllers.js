const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const generateToken = require("../utils/generateToken")

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, picture } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const existsUser = await User.findOne({ email });

  if (existsUser) {
    res.status(400).send({ error: "Users already exists with this email" });
    throw new Error("User already exists with this email");
  } else {
    const user = await User.create({
      username,
      email,
      password,
      picture,
    });

    if (user) {
      res.status(201).json({ user });
    } else {
      res.status(400).json({ error: "Internal Server Error" });
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Please provide both email and password",
    });
  }
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = await generateToken(user._id);
    res.json({ success: true, msg: "Successfully loggedin", token: token});
  } else {
    res.json({
      error:
        "Invalid credentials. Please try to login with correct credentials",
    });
  }
});


const getuserdata = async (req, res) =>{
    res.send({data: req.user});
}

module.exports = { registerUser, loginUser, getuserdata };
