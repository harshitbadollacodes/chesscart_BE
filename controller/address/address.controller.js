

const getAddress = async (req, res) => {
  try {
    const { userId } = req;
    const address = await Address.find({ userId });

    if(address === null) {
      return res.json({
        success: true,
        address: []
      })
    }
    
    res.json({
      success: true,
      address
    });

  } catch(error) {
    console.log(error);
    res.status(500).json({success: false, message: "cannot get address", errorMessage: error.message});
  }
};

const addNewAddress = async (req, res) => {
  try {
    const { userId } = req;
    const { fullName, flatNo, streetName, city, state, pincode } = req.body;
    
    const newAddress = new Address({      
      userId,
      fullName, 
      flatNo,
      streetName,
      city, 
      state, 
      pincode
    });
    const saveAddress = await newAddress.save();

    res.json({
      success: true,
      saveAddress
    });

  } catch(error) {
    console.log(error);
    res.status(400).json({
      success: false, message: "Error occured", errorMessage: error.message
    })
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const address = await Address.findById(addressId);
    
    address.remove();

    res.json({ success: true });
  } catch(error) {
    console.log(error);
    res.status(409).json({
      success: false,
      message: "cannot complete request",
      errorMessage: error.message
    })
  }
};

const editAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const {fullName, flatNo, streetName, city, state, pincode, } = req.body;

    const address = await Address.findById(addressId);
  
    address.fullName = fullName;
    address.flatNo = flatNo;
    address.streetName = streetName;
    address.city = city;
    address.state = state;
    address.pincode = pincode;

    const updatedAddress = await address.save();

    res.json({ success: true, updatedAddress });

  } catch(error) {
    console.log(error);
    res.status(409).json({
      success: false,
      message: "cannot complete request",
      errorMessage: error.message
    })
  }
}

module.exports = {
  getAddress,
  addNewAddress,
  deleteAddress, 
  editAddress
}