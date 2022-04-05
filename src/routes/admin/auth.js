const express = require("express");
const {
  signup,
  signin,
  requireSignin,
} = require("../../controllers/admin/auth");

const router = express.Router();

router.post("/admin/signup", signup);
router.post("/admin/signin", signin);
// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({ user: req.user });
// });
module.exports = router;
