const PORT = 4000;

// Setup frameworks and libraries
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");

// Define routes
const indexRoutes = require('./routes/index');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
	console.log("Request received for:", req.originalUrl);
	next();
})

// Use routes
app.use(indexRoutes)


// Connect to DB
app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});
