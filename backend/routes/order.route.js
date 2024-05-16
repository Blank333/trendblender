const express = require("express");
const router = express.Router();
const order = require("../controllers/order.controller");

router.get("/", order.getAll);
router.get("/count", order.getCount);
router.post("/", order.addOne);
router.get("/:id", order.getAllByUser);

module.exports = router;
