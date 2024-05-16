const express = require("express");
const router = express.Router();
const order = require("../controllers/order.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyAdmin } = require("../middlewares/verifyAdmin");

//Protected routes
router.use(verifyToken);
router.get("/count", verifyAdmin, order.getCount); //Authorized Route

router.get("/:id", order.getAllByUser);

// Authorized Routes
router.use(verifyAdmin);

router.get("/", order.getAll);
router.post("/", order.addOne);
router.put("/:id", order.updateOne);

module.exports = router;
