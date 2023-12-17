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

		posts: {
			type: Array,
			default: [],
			required: false,
		},
	},
	{ collection: "Users" }
);

module.exports = mongoose.model("User", userSchema);
