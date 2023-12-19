// Models
const Post = require("../models/post");
const User = require("../models/user");

const makePost = async (req, res) => {
	try {
		const { userId } = req.user;
		const { title, description, photo } = req.body;
		const author = userId;

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

		// Update the User's posts array
		await User.findByIdAndUpdate(author, { $push: { posts: savedPost._id } });

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
		const user = await User.findById(userId).populate("posts");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({ userId, posts: user.posts });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	makePost,
	getPosts,
};
