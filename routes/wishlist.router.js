const express = require("express");
const router = express.Router();

const { 
  getWishlist, 
  updateWishlist, 
  removeItemFromWishlist 
} = require("../controller/wishlist/wishlist.controller");

router.route("/").get(getWishlist);

router.route("/").post(updateWishlist);

router.route("/:productId").delete(removeItemFromWishlist);

module.exports = router;