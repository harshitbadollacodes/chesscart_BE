const getItemById = async (req, res, next, productId) => {
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
  
};

module.exports = {
  getItemById
}