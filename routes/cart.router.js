const express = require("express");
const router = express.Router();

const { 
  getCart, 
  addToCart, 
  updateItemInCart, 
  removeItemFromCart
} = require("../controller/cart/cart.controller");

router.route("/").get(getCart);

router.route("/").post(addToCart);

router.route("/:productId").post(updateItemInCart)

router.route("/:productId").delete(removeItemFromCart);

module.exports = router;