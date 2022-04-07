const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    //console.log(111, req.user);
    return next();
  }
  return res.status(401).json({ message: "Authorization required" });
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User access denied" });
  }
  return next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    //console.log(333, req.user);
    return res.status(400).json({ message: "Admin access denied" });
  }
  return next();
};
