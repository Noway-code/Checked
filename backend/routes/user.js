const express = require("express");

// Controller functions
const { register, login } = require("../controllers/userController");
const { addFriend, getAllFriends, removeFriend } = require("../controllers/friendController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Login
router.post("/login", login);

// Register
router.post("/register", register);

// Add friend
router.post("/add-friend", verifyToken, addFriend);

// Get all friends
router.get("/friends", getAllFriends);

// Delete a single friend
router.delete("/remove-friend", removeFriend);

module.exports = router;
