const express = require("express");

// Controller functions
const { register, login } = require("../controllers/userController");
const { addFriend, getAllFriends, removeFriend} = require("../controllers/friendController");

const router = express.Router();
// Login
router.post("/login", login);

// Register
router.post("/register", register);

// Add friend
router.post("/add-friend", addFriend);

// Get all friends
router.get("/friends", getAllFriends);

router.delete("/remove-friend", removeFriend);

module.exports = router;
