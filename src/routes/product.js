const express = require("express");
const multer = require("multer");
const { requireSignIn, adminMiddleware } = require("../common-middleware");
const { product_create_post, product_list } = require("../controllers/product");
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
  upload.array("productPicture"),
  product_create_post
);

router.get("/list", requireSignIn, product_list);

module.exports = router;
