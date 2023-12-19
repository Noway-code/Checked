// Models
const User = require("../models/user");

// Libraries
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User login
const login = async (req, res) => {
	const { username, password } = req.body;
	try {
		// Make sure all fields are filled in request body
		if (!username || !password) {
			return res.status(400).json({ error: "All fields are required" });
		}

		// Make sure user exists
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).json({ error: "User not found" });
		}

		// Make sure password is correct
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res.status(401).json({ error: "Incorrect password" });
		}

		// Generate JWT with user information
		const token = jwt.sign(
			{ userId: user._id, username: user.username },
			process.env.SECRET_KEY,
			{ expiresIn: "3d" }
		);

		// Send response with token
		res.status(200).json({ token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Register a new user
const register = async (req, res) => {
	try {
		const { firstName, lastName, username, password } = req.body;

		// Make sure all fields are filled in the request body
		if (!firstName || !lastName || !username || !password) {
			return res.status(400).json({ error: "All fields are required" });
		}

		// Make sure username hasn't been taken
		const existingUser = await User.findOne({ username });

		if (existingUser) {
			return res.status(409).json({ error: "Username is already being used" }); // response code 409 for conflict
		}

		// Hashing Passwords
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(password, salt);

		// Create the new user
		const newUser = new User({
			firstName,
			lastName,
			username,
			password: hashedPass,
		});

		// Save the new user to the DB
		await newUser.save();

		res.status(200).json({ message: "User has been registered successfully" });
	} catch (error) {
		// Catch any errors and throw code 500
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const addFriend = async (req, res) => {
	try {
		const { userId, friendId } = req.body;

		// Make sure all fields are filled in request body
		if (!userId || !friendId) {
			return res.status(400).json({ error: "All fields are required" });
		}

		// Make sure both users exist
		const user = await User.findById(userId);
		const friend = await User.findById(friendId);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		} else if (!friend) {
			return res.status(404).json({ error: "Friend not found" });
		}

		// Make sure they aren't already friends
		if (user.friends.includes(friendId)) {
			return res.status(400).json({ error: "Users are already friends" });
		}

		// Add the friend to the user
		user.friends.push(friendId);

		// =============================================================================
		// == Here we can put in some logic for how we will implement friend requests ==
		// =============================================================================

		// For now, add the user to the friend
		friend.friends.push(userId);

		// Save changes to the DB
		await user.save();
		await friend.save();

		res.json({ message: "Friend added successfully" });
	} catch {
		// Catch any errors
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	register,
	addFriend,
	login,
};
