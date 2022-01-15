const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },

  cartItems: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, "Product objectId is missing"]
    },
    quantity: {
      type: Number,
      default: 1,
      required: [true, "Quantity is missing"]
    }
  }]

}, { 
    timestamps: true
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };