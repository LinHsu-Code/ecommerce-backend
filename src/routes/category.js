const express = require("express");
const {
  category_create_post,
  category_list,
} = require("../controllers/category");
const router = express.Router();

router.post("/category/create", category_create_post);
router.get("/categories", category_list);

module.exports = router;
