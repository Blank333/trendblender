const Product = require("../models/product.model");

//Get all products
exports.getAll = (req, res) => {
  Product.find()
    .then((data) => {
      res.status(200).json({ message: data });
    })
    .catch((err) => {
      return res.status(500).json({ error: `Server Error ${err}` });
    });
};

//Get one product with ID
exports.getOne = (req, res) => {
  const { id } = req.params;

  Product.findById({ _id: id })
    .then((data) => {
      if (!data) return res.status(400).json({ error: "Something went wrong!" });
      return res.status(200).json({ message: data });
    })
    .catch((err) => {
      return res.status(500).json({ error: `Server Error ${err}` });
    });
};

//Add new product
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
      return res.status(200).json({ message: `Added product successfuly! (${data._id})` });
    })
    .catch((err) => {
      return res.status(500).json({ error: `Server error ${err}` });
    });
};

//Update one product with ID
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
      if (!data) return res.status(400).json({ error: "Something went wrong!" });
      return res.status(200).json({ message: data });
    })
    .catch((err) => {
      return res.status(500).json({ error: `Server error ${err}` });
    });
};

//Delete one product with ID
exports.deleteOne = (req, res) => {
  const { id } = req.params;

  Product.findByIdAndDelete(id)
    .then((data) => {
      if (!data) return res.status(400).json({ error: "Something went wrong!" });
      return res.status(200).json({ message: data });
    })
    .catch((err) => {
      return res.status(500).json({ error: `Server error ${err}` });
    });
};
