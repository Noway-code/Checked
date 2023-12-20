const express = require("express");

// Controller functions
const { makePost, getPosts, completePost } = require("../controllers/postController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Make a post
router.post("/make-post", verifyToken, makePost);

// Complete a post
router.put("/update-post", verifyToken, completePost);

// Get the user's posts
router.get("/posts", verifyToken, getPosts);

module.exports = router;
