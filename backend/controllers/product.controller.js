const Product = require("../models/product.model");

exports.getAll = (req, res) => {
  Product.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      return res.status(500).json({ error: `Server Error ${err}` });
    });
};

exports.getOne = (req, res) => {
  const { id } = req.params;

  Product.findById({ _id: id })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      return res.status(500).json({ error: `Server Error ${err}` });
    });
};

exports.addOne = (req, res) => {
  const { name, price, description, imageUrl, stock } = req.body;
  if (!name || !price || !description) return res.status(400).json({ error: "Please provide required fields" });

  const newProduct = new Product({
    name,
    price,
    description,
    imageUrl,
    stock,
  });

  newProduct
    .save()
    .then((data) => {
      if (!data) return res.status(400).json({ error: "Something went wrong!" });
      return res.status(200).json({ message: "Added product successfuly!" });
    })
    .catch((err) => {
      return res.status(500).json({ error: `Server error ${err}` });
    });
};

exports.updateOne = (req, res) => {
  const { name, price, description, imageUrl, stock } = req.body;
  const { id } = req.params;

  const updatedInfo = {
    name,
    price,
    description,
    imageUrl,
    stock,
  };

  Product.findByIdAndUpdate(id, updatedInfo, { new: true, runValidators: true })
    .then((data) => {
      return res.status(200).json({ message: data });
    })
    .catch((err) => {
      return res.status(500).json({ error: `Server error ${err}` });
    });
};
