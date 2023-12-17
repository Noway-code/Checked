const PORT = 4000;

// Setup frameworks and libraries
const express = require("express");
const mongoose = require("mongoose");

// Define routes

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Use routes

// Connect to DB
app.listen(PORT, () => {
	console.log("Server is running on port 4000");
});
