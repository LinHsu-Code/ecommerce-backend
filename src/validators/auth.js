const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Firstname is required"),
  //.isAlphanumeric()
  //.withMessage("Firstname has non-alphanumeric characters."),
  check("lastName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Lastname is required"),
  //.isAlphanumeric()
  //.withMessage("Lastname has non-alphanumeric characters."),
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .trim()
    .escape()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password").trim().escape(),
  //.isLength({ min: 6 })
  //.withMessage("Password must be at least 6 characters long"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    //return res.status(400).json({ errors: errors.array()[0].msg });
  }
  next();
};
