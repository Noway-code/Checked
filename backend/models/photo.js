const mongoose = require("mongoose");

// Define photo schema
const photoSchema = new mongoose.Schema({
	name: String,
	imageUrl: String,
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
