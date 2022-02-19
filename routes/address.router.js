const express = require("express");
const router = express.Router();
const { Address } = require("../models/address.model");

const { 
  getAddress, 
  addNewAddress, 
  deleteAddress, 
  editAddress 
} = require("../controller/address/address.controller");

router.route("/").get(getAddress);

router.route("/new").post(addNewAddress);

router.route("/:addressId").delete(deleteAddress);

router.route("/edit/:addressId").post(editAddress)

module.exports = router;