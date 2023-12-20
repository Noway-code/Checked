const express = require("express");

// Controller functions
const { makePost, getPosts, deletePost, completePost } = require("../controllers/postController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Make a post
router.post("/make-post", verifyToken, makePost);

// Complete a post
router.put("/update-post", verifyToken, completePost);

// Delete a post
router.delete("/delete-post", verifyToken, deletePost);

// Get the user's posts
router.get("/posts", verifyToken, getPosts);

module.exports = router;
