const express = require("express");
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  getuserdata,
  forgetpassword,
  resetpassword,
  updateUserProfile,
} = require("../controllers/authControllers");
const fetchuser = require("../middlewares/fetchuser");
const upload = require("../middlewares/uploader");
const router = express();

// ROUTE 1 : Register User : Login not required
router.post(
  "/register",
  upload.single("picture"),
  body("username")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Username must be atleast two character"),
  body("email").isEmail(),
  body("password", "Password must be at least 8 character long")
    .isString()
    .isLength({ min: 8 })
    .not()
    .isEmpty()
    .withMessage("Password is required field"),
  registerUser
);

// ROUTE 2 : Login User : Login not required
router.post(
  "/login",
  body("email").isEmail(),
  body("password", "Password must be at least 8 character long")
    .isString()
    .isLength({ min: 8 })
    .not()
    .isEmpty()
    .withMessage("Password is required field"),
  loginUser
);

// ROUTE 3 : Get User Data : Login required
router.get("/getuserdata", fetchuser, getuserdata);

// ROUTE 4 : Forget Password : Login not required
router.post("/forgetpassword", body("email").isEmail(), forgetpassword);

// ROUTE 5 : Reset Password : Login not required
router.put(
  "/resetpassword/:resetToken",
  body("password", "Password must be at least 8 character long")
    .isString()
    .isLength({ min: 8 })
    .not()
    .isEmpty()
    .withMessage("Password is required field"),
  resetpassword
);

router.post("/profile", upload.single('picture'), fetchuser, updateUserProfile);

module.exports = router;
