const Order = require("../models/order.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

//Get all orders
exports.getAll = (req, res) => {
  Order.find()
    .then((data) => res.status(200).json(data))
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
  const { shipping, payment, clientNotes, products, user } = req.body;

  if (!shipping || !shipping.address || !shipping.cost || !payment || products.length === 0 || !user)
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
