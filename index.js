const cors = require('cors');
const express = require('express');
const bodyParser = require("body-parser");

const cartRouter = require("./routes/cart.router");
const productRouter = require("./routes/product.router");
const wishlistRouter = require("./routes/wishlist.router");
const userRouter = require("./routes/authentication.router");
const addressRouter = require("./routes/address.router");

const { initializeDbConnection } = require("./data/db.connect");

const { verifyToken } = require("./middlewares/check-auth-middleware");
const { errorHandler } = require("./middlewares/error-handler-middleware");
const { routeNotFound } = require("./middlewares/route-not-found-middleware");

initializeDbConnection();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/products", productRouter);
app.use("/cart", verifyToken, cartRouter);
app.use("/wishlist", verifyToken, wishlistRouter);
app.use("/address", verifyToken, addressRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Refer to the API docs at github.com/"
  });
});

app.use(routeNotFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('server started');
});