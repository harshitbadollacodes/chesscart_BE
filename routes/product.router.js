const express = require("express");
const router = express.Router();
const { data } = require("../data/db");
const { getProducts, getProductDetails } = require("../controller/products/product.controller");
const { getItemById } = require("../middlewares/getItem-middleware");

// Call once for initial data on DB
function pushProductsToDB(data) {
  data.forEach(async (item) => {
    const product = new Product(item);
    const SavedProduct = await product.save();
  })
};

// pushProductsToDB(data);

router.route('/').get(getProducts);

router.param("productId", getItemById);

router.route("/:productId").get(getProductDetails);

module.exports = router;