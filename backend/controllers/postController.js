// Models
const Post = require("../models/post");

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
