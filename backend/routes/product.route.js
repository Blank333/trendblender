const express = require("express");
const router = express.Router();
const product = require("../controllers/product.controller");

router.get("/", product.getAll);
router.get("/count", product.getCount);
router.post("/", product.addOne);
router.get("/:id", product.getOne);
router.put("/:id", product.updateOne);
router.delete("/:id", product.deleteOne);

module.exports = router;
