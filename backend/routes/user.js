const express = require("express");

// Controller functions
const { register, addFriend ,login} = require("../controllers/userController");


const router = express.Router();
// Login
router.post("/login", login);

// Register
router.post("/register", register);

// Add friend
router.post("/add-friend", addFriend);

module.exports = router;
