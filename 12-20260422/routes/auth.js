const express = require("express");
const router = express.Router();
const authControllerController = require("../controllers/authController");

router.post("/", authControllerController.handleLogin);

module.exports = router;
