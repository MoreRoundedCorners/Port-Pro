const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log("Token:", token); // Add this line to log the token value
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.userData = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};
