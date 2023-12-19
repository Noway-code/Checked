const express = require("express");

// Controller functions
const { makePost } = require("../controllers/postController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Make a post
router.post("/post", verifyToken, makePost);

module.exports = router;
