// Models
const Post = require("../models/post");
const User = require("../models/user");

const makePost = async (req, res) => {
	try {
		const { author, title, description, photo } = req.body;

		// Make sure that author and title is given
		if (!author || !title) {
			return res.status(400).json({ error: "Author and title are required" });
		}

		// Create a new post
		const newPost = new Post({
			author,
			title,
			description,
			photo,
		});

		// Save the post to the DB
		const savedPost = await newPost.save();

		res.status(201).json({ message: "Post added successfully", post: savedPost });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const getPosts = async (req, res) => {
	try {
		const { userId } = req.user;

		// Make sure that author and title is given
		if (!userId) {
			return res.status(400).json({ error: "User ID is missing" });
		}

		// Make sure user exists
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Get all posts
		const posts = await User.find(
			{ _id: { $in: user.posts } },
			{ username: 1, firstName: 1, lastName: 1 }
		);

		// Return message if no posts
		if (posts.length === 0) {
			return res.status(200).json({ message: "You don't have any posts." });
		}

		res.status(200).json(friends);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	makePost,
	getPosts,
};
