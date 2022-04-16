const express = require("express");
const { requireSignIn } = require("../../common-middleware");
const { signup, signin, signout } = require("../../controllers/admin/auth");

const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../../validators/auth");

const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/signout", requireSignIn, signout);
// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({ user: req.user });
// });
module.exports = router;
