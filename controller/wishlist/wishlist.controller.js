const express = require("express");
const router = express.Router();
const { Wishlist } = require("../../models/wishlist.model");

const getWishlist = async (req, res) => {
  try {
    const { userId } = req;
  
    let wishlist = await Wishlist.findById(userId).populate("wishlistItems.product");

    if(!wishlist) {
      return res.json({ 
        success: false,
        message: "User has not initiated wishlist until now. Sending an empty array as wishist",
        wishlist: {
          wishlistItems: []
        }
      })
    };

    res.json({ success: true, wishlist });

  } catch(error) {
    res.status(400).json({ success: false, message: "error",errorMessage: error.message });
  };
};

const updateWishlist = async (req, res) => {
  try {
    const { userId } = req;
    const { productId } = req.body;
    
    const wishlist = await Wishlist.findById(userId);

    if(!wishlist) {
      let wishlist = new Wishlist({
        _id: userId,
        wishlistItems: [{
          product: productId,
        }]
      });

      await wishlist.save();
      return res.json({ success: true, wishlist});
    };

    wishlist.wishlistItems = [...wishlist.wishlistItems, {
      product: productId
    }]
    await wishlist.save();
    res.json({ success: true, wishlist });
    
  } catch(error) {
    res.status(400).json({ success: false, message: "error",     errorMessage: error.message
    })
  }
};

const removeItemFromWishlist = async(req, res) => {
  try {
    const { userId } = req;
    const { productId } = req.params;

    const wishlist = await Wishlist.findById(userId);

    const findIndex = await wishlist.wishlistItems.findIndex(item => String(item.product) === productId);

    console.log("findIndex", findIndex);
    if(findIndex !== -1) {
      await wishlist.wishlistItems[findIndex].remove();
      await wishlist.save();
      res.json({ success: true, wishlist });
    }
    
  } catch(error) {
    res.status(400).json({ success: false, message: "error", errorMessage: error.message });
  }
}

module.exports = {
  getWishlist,
  updateWishlist,
  removeItemFromWishlist
}