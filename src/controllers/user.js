const User = require("../models/user");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        message: "sign up find user error",
      });
    }
    if (user) {
      return res.status(400).json({
        message: "User has already registered",
      });
    }
    console.log("dddddd");
    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });
    console.log("_user:", _user);
    _user.save((err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          message: "sign up save user error",
        });
      }
      return res.status(201).json({
        message: "sign up successfully",
      });
    });
  });
};
