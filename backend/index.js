const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const { PORT, DB_URL, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } = require("./config");
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

// Image upload
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
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
