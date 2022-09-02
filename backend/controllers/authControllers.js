const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const fs = require("fs");
const path = require('path')

// Register user route contorller

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  const { username, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const existsUser = await User.findOne({ email });

  if (existsUser) {
    res.status(400).send({ error: "Users already exists with this email" });
    throw new Error("User already exists with this email");
  } else {
    const picture = `http://localhost:8000/${req.file.filename}`;
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

// Login User route controller

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
    res.json({ success: true, msg: "Successfully loggedin", token: token });
  } else {
    res.json({
      error:
        "Invalid credentials. Please try to login with correct credentials",
    });
  }
});

// Forget password route controller

const forgetpassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send("User doesn't exists with this email");
    } else {
      const resetToken = await user.getResetPasswordToken();
      await user.save();

      const resetURL = `http://localhost:3000/resetpassword/${resetToken}`;
      const message = `
              <h1> You have request a password request </h1>
              <p> Please go through this link to reset your password for your account in notesapp </p>
              <a href=${resetURL} clicktracking="off"> ${resetURL} </a>
                        `;

      try {
        await sendEmail({
          from: "santoshphaiju@gmail.com",
          to: email,
          subject: "Reset Your password for notesapp",
          text: message,
        });
        res.status(201).send({ success: true, msg: "Email successfully sent" });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        user.save();
        console.log(error);
        res.status(400).json({ error: error.message, success: false });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// Reset password route controller
const resetpassword = async (req, res) => {
  const { password } = req.body.password;
  const resetToken = req.params.resetToken;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).send({ error: "Reset password token expired" });
    }
    user.password = password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();

    res.status(201).send({ success: true, msg: "Password reset successfull" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message, success: false });
  }
};


// Router controller for uploading images of the user and updating profile
const updateUserProfile = async (req, res) =>{
  try {
    const user = await User.findById(req.user.id).select("-password");
    const {username, email, picture} = req.body;
    console.log(req.file);
    if(user){
      const basename = path.basename(user.picture);
      console.log(basename)
      if(req.file){
        fs.unlink(path.join(__dirname, `../src/uploads/${basename}`), (err) =>{
          if(err){
            return res.status(400).send({error: err});
          }
        })
        const updatedPicture = `http://localhost:8000/${req.file.filename}`;
        user.picture = updatedPicture;
      }else{
        user.picture = user.picture;
      }
      user.username = username || user.username;
      user.email = email || user.email;
      
      const updatedUser = await user.save();
  
      res.json({success: true, result: updatedUser});
    }else{
      res.status(400).send({error: "User is not valid"})
    }

  } catch (error) {
    res.status(500).send({error: "Internal Server Error"})
    console.log(error);
  }
}

// Getting user data route controller

const getuserdata = async (req, res) => {
  res.send({ data: req.user });
};

module.exports = {
  registerUser,
  loginUser,
  getuserdata,
  forgetpassword,
  resetpassword,
  updateUserProfile
};
