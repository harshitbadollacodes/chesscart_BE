const express = require("express");
const router = express.Router();
const { Product } = require("../../models/product.model");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch(error) {
    console.log(error);
    res.status(500).json({success: false, message: "cannot get products", errorMessage: error.message});
  }
};

const getProductDetails = (req, res) => {

  let { product } = req;
  console.log(product);
  product.__v = undefined;

  return res.json({success: true, product});
  
};

module.exports = { 
  getProducts,
  getProductDetails
};