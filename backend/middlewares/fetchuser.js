const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(400).json({ error: "Invalid Token" });
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verifiedToken.id).select("-password");
    if (!user) {
      return res.status(400).send({ error: "No user found with this id" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = fetchuser;
