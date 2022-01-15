const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const { data } = require("../data/db");
const { Product } = require("../models/product.model");

// Call once for initial data on DB
function pushProductsToDB(data) {
  data.forEach(async (item) => {
    const product = new Product(item);
    const SavedProduct = await product.save();
  })
};

// pushProductsToDB(data);

router.route('/')
.get(async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch(error) {
    console.log(error);
    res.status(500).json({success: false, message: "cannot get products", errorMessage: error.message});
  }
});

router.param("productId", async (req, res, next, productId) => {
  try {

    const product = await Product.findById(productId);

    if(!product) {
      return res.status(400).json({ success: false, message: "Error retrieving the product as the product doesn't exist"});
    }

    req.product = product
    next();
  } catch(err) {
    res.status(400).json({ success: false, message: "Error retrieving the product"});
  }
  
})


router.route("/:productId")
.get((req, res) => {

  let { product } = req;
  console.log(product);
  product.__v = undefined;

  return res.json({success: true, product});
  
});

module.exports = router;