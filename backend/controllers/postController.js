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


const completePost = async (req, res) => {
	try {
		// Feel free to switch postId from body to params
		// or header I wasn't sure which would be best.
		const { userId } = req.user;
		const { postId } = req.body;
		const { title, description, /*photo*/ } = req.body;

		if (!postId) {
			return res.status(400).json({ error: "Post ID is required" });
		}

		if(!title||!description){
			return res.status(400).json({ error: "Title and description are required" });
		}

		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		if (post.isCompleted) {
			return res.status(400).json({ error: "Post is already completed" });
		}

		post.title = title;
		post.description = description;
		post.isCompleted = true;
		post.completedAt = Date.now();
		const savedPost = await post.save();

		res.status(200).json({ message: "Post marked as completed", post: savedPost });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

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
	completePost,
};
