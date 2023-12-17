const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
	name: String,
	imageUrl: String,
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
