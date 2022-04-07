const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
  category_create_post,
  category_list,
} = require("../controllers/category");

const router = express.Router();

router.post(
  "/category/create",
  requireSignin,
  adminMiddleware,
  category_create_post
);
router.get("/categories", category_list);

module.exports = router;