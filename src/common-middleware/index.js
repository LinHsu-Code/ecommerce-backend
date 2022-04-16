const jwt = require("jsonwebtoken");

exports.requireSignIn = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    return next();
  }
  return res.status(400).json({ errorMessage: "Authorization required" });
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ errorMessage: "User access denied" });
  }
  return next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ errorMessage: "Admin access denied" });
  }
  return next();
};
