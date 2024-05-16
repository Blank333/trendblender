const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihatdA4DIuyG7MLUMAOYqjcyKDZo0-OuBi8Y2lZ4NysvuatNgGi3-mQ83IAvHWh7YO9BchwowGWvzCgg5QzGWAEhdGhboJSp6vw=w2560-h1240",
    },
    rating: {
      type: Number,
      default: -1,
      min: -1,
      max: 5,
    },
    stock: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
