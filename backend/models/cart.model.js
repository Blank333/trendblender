const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const cartSchema = mongoose.Schema(
  {
    products: {
      type: [productSchema],
      ref: "Product",
      validate: {
        validator: (value) => {
          //Validation for empty array
          return Array.isArray(value) && value.length > 0;
        },
      },
      message: "No products specified!",
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
