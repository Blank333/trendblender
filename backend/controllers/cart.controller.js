const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

//Return all carts
exports.getAll = (req, res) => {
  Cart.find()
    .then((carts) => {
      return res.status(200).json({ message: carts });
    })
    .catch((err) => {
      return res.status(500).json({ error: `Server Error ${err}` });
    });
};

//Add product to cart
exports.addProduct = (req, res) => {
  const { product, quantity } = req.body;
  const { user } = req;
  if (!product) return res.status(400).json({ error: "Please provide required fields" });
  if (quantity <= 0) return res.status(400).json({ error: "Invalid quantity" });
  //Check for valid products
  Product.findById(product)
    .then((data) => {
      if (!data) return res.status(400).json({ error: "Invalid product" });
      if (data.stock === 0) return res.status(400).json({ error: "Out of stock product" });
      //Find if cart exists
      Cart.findOne({ user: user }).then((cart) => {
        if (!cart) {
          // Create new cart with the product
          const cartInfo = new Cart({
            products: { _id: product, quantity },
            user,
          });
          cartInfo
            .save()
            .then((data) => {
              if (!data) return res.status(400).json({ error: "Something went wrong!" });
              return res.status(200).json({ message: `Added to cart! (${data._id})` });
            })
            .catch((err) => {
              return res.status(500).json({ error: `Server error ${err}` });
            });
        } else {
          // Update cart with the product
          const productIndex = cart.products.findIndex((prod) => prod._id == product);
          if (productIndex >= 0) {
            // Update quantity
            cart.products[productIndex].quantity = quantity || 1;
          } else {
            // Add new product
            cart.products.push({ _id: product, quantity: quantity });
          }

          // Save the updated cart
          cart
            .save()
            .then((data) => {
              if (!data) return res.status(400).json({ error: "Something went wrong!" });
              return res.status(200).json({ message: `Added to cart! (${data._id})` });
            })
            .catch((err) => {
              return res.status(500).json({ error: `Server error ${err}` });
            });
        }
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: `Server error ${err}` });
    });
};

//Update product quantity in cart
exports.updateQuantity = (req, res) => {
  const { product, quantity } = req.body;
  const { user } = req;
  if (!product) return res.status(400).json({ error: "Please provide required fields" });
  if (quantity <= 0) return res.status(400).json({ error: "Invalid quantity" });
  //Check for valid products
  Product.findById(product)
    .then((data) => {
      if (!data) return res.status(400).json({ error: "Invalid product" });
      if (data.stock === 0) return res.status(400).json({ error: "Out of stock product" });

      Cart.findOne({ user: user }).then((cart) => {
        if (!cart) return res.status(400).json({ error: "Invalid cart" });
        const productIndex = cart.products.findIndex((prod) => prod._id == product);
        if (productIndex < 0) return res.status(400).json({ error: "Invalid product" });

        cart.products[productIndex].quantity = quantity;
        cart
          .save()
          .then((data) => {
            if (!data) return res.status(400).json({ error: "Something went wrong!" });
            return res.status(200).json({ message: `Quantity updated! (${data._id})` });
          })
          .catch((err) => {
            return res.status(500).json({ error: `Server error ${err}` });
          });
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: `Server error ${err}` });
    });
};
