const express = require("express");

// Controller functions
const { register, addFriend } = require("../controllers/userController");

const router = express.Router();

// Register
router.post("/register", register);

// Add friend
router.post("/add-friend", addFriend);

module.exports = router;
