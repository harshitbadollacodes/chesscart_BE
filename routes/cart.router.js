const { Cart }  = require("../models/cart.model");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.route("/")
.get(async (req, res) => {
  try { 
    let { userId } = req;
    let cart = await Cart.findById(userId).populate("cartItems.product");

    if(!cart) {      
      return res.json({
        success: false,
        message: "Cart not found",
        cart: {
          cartItems: []
        }
      });
    };

    cart.cartItems = await cart.cartItems.filter(item => item.quantity > 0);

    res.json({success: true, cart});

  } catch(error) {
    console.log(error);
    res.status(500).json({success: false, message: "Cannot retrieve cart", errorMessage: error.message});
  }
})
.post(async (req, res) => {
  try {
    const { userId } = req;
    
    const { productId, quantity } = req.body;

    let cart = await Cart.findById(userId);
    
    if(!cart) {
      let cart = new Cart({
        _id: userId,
        cartItems: [{
          product: productId,
          quantity: quantity
        }],
      });
      await cart.save();
      
      return res.json({ 
        success: true, 
        message: "added to cart",
        cart
      })
    }

    cart.cartItems.push({
      product: productId,
      quantity: quantity
    })
      
    await cart.save();

    res.json({ success: true, message: "added to cart", cart});

  } catch(error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: "Cannot add product to cart", errorMessage: error.message});
  }
});

router.route("/:productId")
.post(async(req, res) => {
  try {
    const { userId } = req;
    const { productId } = req.params;
    const { updateQuantity } = req.body;

    console.log(productId);

    const cart = await Cart.findById(userId);
    
    const findIndex = cart.cartItems.findIndex(item => String(item.product) === productId);

    cart.cartItems[findIndex].quantity = updateQuantity;
    
    await cart.save();

    res.json({ success: true, cart })
  } catch(error) {
    console.log(error);
    res.status(400).json({ success: false, message: "error", errorMessage: error.message});
  }
  
})
.delete(async (req, res) => {
  try {
    const { userId } = req;
    const { productId } = req.params;
    const cart = await Cart.findById(userId);

    const findIndex = await cart.cartItems.findIndex(item => String(item.product) === productId);

    cart.cartItems[findIndex].remove();

    await cart.save();

    res.json({ success: true, cart});
  } catch(error) {
    console.log(error);
    res.status(400).json({ success: false, message: "error", errorMessage: error.message});
  }
})
module.exports = router;