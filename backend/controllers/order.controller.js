const Order = require("../models/order.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

// Total orders
exports.getCount = (req, res) => {
  Order.countDocuments()
    .then((data) => {
      return res.status(200).json({ message: data });
    })
    .catch((err) => {
      return res.status(500).json({ error: `Server Error ${err}` });
    });
};

//Get all orders
exports.getAll = (req, res) => {
  //For pagination and sorting
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const sort = parseInt(req.query.sort) || 1;

  if (page <= 0 || limit <= 0) {
    return res.status(400).json({ error: "Invalid request" });
  }

  //Sorting by date and populating the user and products fields
  Order.find()
    .sort({ createdAt: sort })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("user", "firstname lastname email")
    .populate({
      path: "products._id",
      model: "Product",
      select: "name",
    })
    .then((data) => {
      return res.status(200).json({ message: data });
    })
    .catch((err) => {
      return res.status(500).json({ error: `Server Error ${err}` });
    });
};

//Get all orders of a user
exports.getAllByUser = (req, res) => {
  const { id } = req.params;
  Order.find({ user: id })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      return res.status(500).json({ error: `Server Error ${err}` });
    });
};

//Add new order
exports.addOne = (req, res) => {
  const { shipping, payment, clientNotes, products } = req.body;
  const { user } = req;

  //Base shipping cost
  shipping.cost = 100;

  // Validations for empty fields
  if (
    products.length === 0 ||
    !payment ||
    !shipping ||
    !shipping.address ||
    !shipping.address.city ||
    !shipping.address.pincode ||
    !shipping.address.state ||
    !shipping.address.street
  )
    return res.status(400).json({ error: "Please provide required fields" });

  const totalCost = 0;

  const productIds = products.map((product) => product._id);
  const quantities = products.map((product) => product.quantity);

  //Check for valid products
  Product.find({ _id: { $in: productIds } })
    .then((data) => {
      if (data.length !== products.length) return res.status(400).json({ error: "Invalid products in order" });
      if (data.find((item) => item.stock === 0))
        return res.status(400).json({ error: "Out of stock products in order" });

      //Calculate total cost
      shipping.cost += quantities.reduce((sum, qty) => sum + qty, 0) * 20; // 20 per item shipping cost
      const totalCost = shipping.cost + data.reduce((sum, item, index) => sum + item.price * quantities[index], 0);

      //Place order
      const newOrder = new Order({
        shipping,
        payment,
        totalCost,
        clientNotes,
        products,
        user,
      });

      newOrder
        .save()
        .then((data) => {
          if (!data) return res.status(400).json({ error: "Something went wrong!" });
          return res.status(200).json({ message: `Order placed successfuly! (${data._id})` });
        })
        .catch((err) => {
          return res.status(500).json({ error: `Server error ${err}` });
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: `Server error ${err}` });
    });
};

//Update Order
exports.updateOne = (req, res) => {
  const { status, deliveryDate } = req.body;
  const { id } = req.params;

  const updatedInfo = {
    status,
    deliveryDate,
  };
  Order.findByIdAndUpdate(id, updatedInfo, { new: true, runValidators: true })
    .then((data) => {
      if (!data) return res.status(400).json({ error: "Something went wrong!" });
      return res.status(200).json({ message: `Updated product successfuly! (${data._id})` });
    })
    .catch((err) => {
      return res.status(500).json({ error: `Server error ${err}` });
    });
};
