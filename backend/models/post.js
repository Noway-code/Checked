const mongoose = require("mongoose");
const Photo = require("./photo.js");
const User = require("./user.js");

const Schema = mongoose.Schema;

// Define post schema
const postSchema = new Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			unique: true,
			required: true,
		},

		title: {
			type: String,
			required: true,
		},

		description: {
			type: Array,
			default: [],
			required: false,
		},

		photo: {
			type: Photo.schema,
			required: false,
			// TODO: add default photo
		},

		createdAt: {
			type: Date,
			default: Date.now(),
		},

		isCompleted: {
			type: Boolean,
			default: false,
			required: false,
		},

		completedAt: {
			type: Date,
			required: false,
		},
	},
	{ collection: "Posts" }
);

module.exports = mongoose.model("Post", postSchema);
