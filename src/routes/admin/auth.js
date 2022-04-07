const express = require("express");
const { signup, signin } = require("../../controllers/admin/auth");

const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../../validators/auth");

const router = express.Router();

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);
// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({ user: req.user });
// });
module.exports = router;
