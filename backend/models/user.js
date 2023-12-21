const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define user schema
const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},

		password: {
			type: String,
			required: true,
		},

		friends: {
			type: Array,
			default: [],
			required: false,
		},

		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post",
			},
		],

		settings: {
			// darkmode not to be implemented yet,
			// I just needed more settings to test
			lightMode: {
				type: String,
				enum: ["dark", "light", "every element is the color white"],
				default: "dark", // Set the default visibility based on your preference
			},
			postVisibility: {
				type: Boolean,
				default: true,
			},
		},
	},
	{ collection: "Users" }
);

module.exports = mongoose.model("User", userSchema);
