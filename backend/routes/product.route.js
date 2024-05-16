const express = require("express");
const router = express.Router();
const product = require("../controllers/product.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyAdmin } = require("../middlewares/verifyAdmin");

// Normal Routes
router.get("/", product.getAll);
router.get("/count", product.getCount);
router.get("/:id", product.getOne);

// Protected Routes
router.use(verifyToken);
// Authorized Routes
router.use(verifyAdmin);

router.post("/", product.addOne);
router.put("/:id", product.updateOne);
router.delete("/:id", product.deleteOne);

module.exports = router;
