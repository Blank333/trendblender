const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/", user.getAll);
router.get("/count", user.getCount);
router.get("/auth", verifyToken, user.authenticate);
router.post("/register", user.register);
router.post("/login", user.login);
router.get("/:email", user.getOne);

module.exports = router;
