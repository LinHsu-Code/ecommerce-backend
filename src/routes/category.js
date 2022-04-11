const express = require("express");
const multer = require("multer");
const { requireSignIn, adminMiddleware } = require("../common-middleware");
const {
  category_create_post,
  category_list,
} = require("../controllers/category");
const { nanoid } = require("nanoid");
const path = require("path");

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/create",
  requireSignIn,
  adminMiddleware,
  upload.single("categoryImage"),
  category_create_post
);
router.get("/list", category_list);

module.exports = router;
