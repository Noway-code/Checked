const PORT = 4000;

// Setup frameworks and libraries

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
const URI = process.env.MONGO_URI;

// Define routes
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const indexRoutes = require("./routes/index");

// Create Express app
const app = express();

//Configure CORS
// #TODO - Change origin to frontend url, do not use wildcard.
const corsOptions = {
	origin: '*',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
	optionsSuccessStatus: 204,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
	console.log("Request received for:", req.originalUrl);
	next();
});

// Use routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
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
