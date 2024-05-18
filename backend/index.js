const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT, DB_URL } = require("./config");
const app = express();

const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const orderRoute = require("./routes/order.route");
const cartRoute = require("./routes/cart.route");
// Middlewares
app.use(cors());
app.use(express.json());

// Database
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`Connected to database (${DB_URL})`);
  })
  .catch((err) => {
    console.error(`Error connecting to database ${err}`);
  });

// Routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartRoute);

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
