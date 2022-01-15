const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddressSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  fullName: {
    type: String,
    trim: true,
    required: "Please enter fullname"
  },
  flatNo: {
    type: String,
    trim: true,
    required: "Please enter flat no"
  },
  streetName: {
    type: String,
    trim: true,
    required: "Please enter street name"
  },
  city: {
    type: String,
    trim: true,
    required: "Please enter city"
  },
  state: {
    type: String,
    trim: true,
    required: "Please enter state"
  },
  pincode: {
    type: Number,
    trim: true,
    required: "Please enter pincode"
  }
}, {
  timestamps: true
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = { Address };