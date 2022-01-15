const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  wishlistItems: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "wishlist item id is missing"]
    }
  }]
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = { Wishlist };