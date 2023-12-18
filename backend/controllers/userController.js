const User = require("../models/user");

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

		// TODO: hash password

		// Create the new user
		const newUser = new User({
			firstName,
			lastName,
			username,
			password,
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
};
