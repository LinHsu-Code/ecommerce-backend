const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        message: "sign up find admin error",
      });
    }
    if (user) {
      return res.status(400).json({
        message: "Admin has already registered",
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
          message: "sign up save admin error",
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
      return res.status(400).json({ err });
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
        return res.status(200).json({
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
      return res
        .status(400)
        .json({ message: "Invalid Password or the role is not admin" });
    }
    return res.status(400).json({ message: "Invalid Username" });
  });
};
