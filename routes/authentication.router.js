const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const { findUserByEmail } = require("../controller/users/user-controller");

router.route("/login")
.post(async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await findUserByEmail(email);

    if(user === null) {
      return res.status(401).json({
        success: false, 
        message: "Looks like you have not signed up"
      })
    } 

    let match = await bcrypt.compare(password, user.password);

    if(!match) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect"
      })
    } 

    const token = jwt.sign({ userId: user._id}, process.env.JWTSECRET, {
        expiresIn: "24h"
      });

      return res.json({ 
        success: true, 
        message: "Auth success",
        userId: user.id,
        token
      })

  } catch(err) {
    console.log(err);
    return res.status(500).json({
        success: false, 
        message: "Auth failed", 
        errMessage: err.message
      })
  }
});
  
router.route("/signup")
.post(async (req, res) => {
  try {
    const {firstName, lastName, email, password} = req.body;
    const user = await findUserByEmail(email);

    if(user) {
      return res.status(409).json({
        success: false, 
        message: "Email already exists"
      })
    }

    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    const saveNewUser = await newUser.save();
    const token = jwt.sign({ userId: saveNewUser._id }, process.env.JWTSECRET, { expiresIn: "24h" });

    res.json({
      success: true,
      message: "Signup successful",
      userId: saveNewUser._id,
      token
    });
    
  } catch(err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Cannot create user", errMessage: err.message});
  }
});

module.exports = router;