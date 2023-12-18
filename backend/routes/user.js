const express = require("express");

// Controller functions
const { register } = require("../controllers/userController");

const router = express.Router();

// Register
router.post("/register", register);

module.exports = router;
