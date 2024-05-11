const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

//Seperate schema to make required work (https://mongoosejs.com/docs/validation.html#required-validators-on-nested-objects)
const shippingSchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  deliveryDate: {
    type: Date,
    default: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
  },
});

const productSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const orderSchema = mongoose.Schema(
  {
    shipping: {
      type: shippingSchema,
      required: true,
    },
    status: {
      type: String,
      default: "Processing",
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    },
    payment: {
      type: String,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    clientNotes: {
      type: String,
    },
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

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
