const jwt = require("jsonwebtoken");

function verifyToken (req, res, next) {
  try {
    
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.userId = decoded.userId;
    next();
  } catch(err) {
    console.log("err", err.message);
    res.status(401).json({ success: false, message: "Auth failed"});
  }
};

module.exports = { verifyToken };