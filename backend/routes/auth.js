const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser, getuserdata } = require("../controllers/authControllers");
const fetchuser = require("../middlewares/fetchuser");
const router = express();

// ROUTE 1 : Register User : Login not required
router.post(
  "/register",
  body("username").isString().isLength({ min: 2 }).withMessage("Username must be atleast two character"),
  body("email").isEmail(),
  body("password", "Password must be at least 8 character long").isString().isLength({min: 8}).not().isEmpty().withMessage("Password is required field"),
  registerUser
);


// ROUTE 2 : Login User : Login not required
router.post("/login", loginUser)

// ROUTE 3 : Get User Data : Login required
router.get("/getuserdata", fetchuser, getuserdata)


// ROUTE 4 : Forget Password : Login not required

// ROUTE 5 : Reset Password : Login not required

module.exports = router;
