const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: "Please enter the first name",
  },

  lastName: {
    type: String,
    required: "last name is missing"
  },

  email: {
    type: String,
    unique: true,
    required: "email is missing",
  },

  password: {
    type: String,
    required: "password is missing",
    minLength: 8,
  }
}, {
  timestamps: true
})


const User = mongoose.model("User", UserSchema);

module.exports = { User };