const Product = require("../models/product.model");

// Total items
exports.getCount = (req, res) => {
  Product.countDocuments()
    .then((data) => {
      return res.status(200).json({ message: data });
    })
    .catch((err) => {
      return res.status(500).json({ error: `Server Error ${err}` });
    });
};

//Get products in pages
exports.getAll = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const sort = parseInt(req.query.sort) || 1;

  if (page <= 0 || limit <= 0) {
    return res.status(400).json({ error: "Invalid request" });
  }

  //Sort by date, then make pages
  Product.find()
    .sort({ createdAt: sort })
    .skip((page - 1) * limit)
    .limit(limit)
    .then((data) => {
      return res.status(200).json({ message: data });
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
      return res.status(200).json({ message: `Updated product successfuly! (${data._id})` });
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
      return res.status(200).json({ message: `Deleted product successfuly! (${data._id})` });
    })
    .catch((err) => {
      return res.status(500).json({ error: `Server error ${err}` });
    });
};
