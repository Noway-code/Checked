const express = require("express");

// Controller functions

const { makePost, getPosts, deletePost, completePost, editPost } = require("../controllers/postController");

const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Make a post
router.post("/make-post", verifyToken, makePost);

// Complete a post
router.patch("/update-post", verifyToken, completePost);

// Edit post
router.patch("/edit-post", verifyToken, editPost);

// Delete a post
router.delete("/delete-post", verifyToken, deletePost);

// Get the user's posts
router.get("/posts", verifyToken, getPosts);

module.exports = router;
