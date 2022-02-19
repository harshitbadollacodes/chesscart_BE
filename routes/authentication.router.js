const express = require("express");
const router = express.Router();

const { findUserByEmail, loginUser, signupUser } = require("../controller/users/user-controller");

router.route("/login").post(loginUser);
  
router.route("/signup").post(signupUser);

module.exports = router;