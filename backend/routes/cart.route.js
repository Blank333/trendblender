const express = require("express");
const router = express.Router();
const cart = require("../controllers/cart.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyAdmin } = require("../middlewares/verifyAdmin");

//Protected routes
router.use(verifyToken);

router.post("/", cart.addProduct);
router.post("/quantity", cart.updateQuantity);

//Authorized Routes
router.use(verifyAdmin);

router.get("/", cart.getAll);

module.exports = router;
