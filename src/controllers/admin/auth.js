const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        errorMessage: "sign up find admin error",
        error: err,
      });
    }
    if (user) {
      return res.status(400).json({
        errorMessage: "Admin has already registered",
        error: err,
      });
    }
    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
      role: "admin",
    });
    _user.save((err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          errorMessage: "sign up save admin error",
          error: err,
        });
      }
      return res.status(201).json({
        message: "admin sign up successfully",
      });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ error: err, errorMessage: "sign in find user error" });
    }
    if (user) {
      if (user.authenticate(req.body.password) && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: "1h" });
        return res.status(201).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      }
      return res.status(400).json({
        error: err,
        errorMessage: "Invalid Password or the role is not admin",
      });
    }
    return res
      .status(400)
      .json({ error: err, errorMessage: "Invalid Username" });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "logout successfully" });
};
