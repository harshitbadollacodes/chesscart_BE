function errorHandler(err, req, res, next) {
  console.error(err.stack);
  console.log(err);
  res.status(500).json({success: false, message: "error generated. see the error messaage for more details", errMessage: err.message});
}

module.exports = { errorHandler };