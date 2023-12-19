const PORT = 4000;

// Setup frameworks and libraries

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const URI = process.env.MONGO_URI;

// Define routes
const userRoutes = require("./routes/user");
const indexRoutes = require("./routes/index");

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
	console.log("Request received for:", req.originalUrl);
	next();
});

// Use routes
app.use("/api/user", userRoutes);
app.use(indexRoutes);

// Connect to DB
mongoose
	.connect(URI)
	.then(() => {
		// Start server
		app.listen(PORT, () => {
			console.log("Connected to db & server is running on port " + PORT);
		});
	})
	.catch((err) => console.log(err));
