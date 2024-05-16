const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyAdmin } = require("../middlewares/verifyAdmin");

// Normal routes
router.post("/register", user.register);
router.post("/login", user.login);

// Protected Routes
router.use(verifyToken);

router.get("/count", verifyAdmin, user.getCount); //Authorized Route
router.get("/auth", user.authenticate);
router.get("/:email", user.getOne);

// Authorized Routes
router.use(verifyAdmin);

router.get("/", user.getAll);
router.put("/:id", user.updateOne);
router.delete("/:id", user.deleteOne);

module.exports = router;
