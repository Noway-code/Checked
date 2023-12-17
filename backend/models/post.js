const mongoose = require("mongoose");
const Photo = require("./image.js");
const User = require("./user.js");

const Schema = mongoose.Schema;

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

		completed: {
			type: Boolean,
			default: false,
			required: false,
		},
	},
	{ collection: "Posts" }
);

module.exports = mongoose.model("User", userSchema);
