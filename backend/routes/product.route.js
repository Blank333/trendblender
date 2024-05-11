const express = require("express");
const router = express.Router();
const product = require("../controllers/product.controller");

router.get("/", product.getAll);
router.get("/:id", product.getOne);
router.put("/:id", product.updateOne);
router.post("/", product.addOne);

module.exports = router;
