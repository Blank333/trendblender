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
      default: "https://res.cloudinary.com/djpawrjb6/image/upload/v1716046148/noImage_csw7ti.png",
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
