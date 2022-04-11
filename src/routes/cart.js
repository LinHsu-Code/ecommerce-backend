const express = require("express");
const { requireSignIn, userMiddleware } = require("../common-middleware");
const { cart_add_post } = require("../controllers/cart");

const router = express.Router();

router.post("/add", requireSignIn, userMiddleware, cart_add_post);
//router.get("/categories", category_list);

module.exports = router;
