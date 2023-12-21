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

const updateUserSetting = async (req, res) => {
	try {
		const { userId } = req.user;
		const { settingName, settingValue } = req.body;

		// List of allowed settings
		const allowedSettings = ['postsPrivate']; // Add other settings as needed

		// Check if the settingName and settingValue are provided
		if (!settingName || settingValue === undefined) {
			return res.status(400).json({ error: "Setting name and value are required" });
		}

		// Check if the provided settingName is allowed
		if (!allowedSettings.includes(settingName)) {
			return res.status(400).json({ error: "Invalid setting name" });
		}

		// Define the update object based on the provided settingName
		const updateObject = { $set: { [`settings.${settingName}`]: settingValue } };

		// Update the user's settings
		const updatedUser = await User.findByIdAndUpdate(userId, updateObject, { new: true });

		if (!updatedUser) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({ message: "User settings updated successfully"});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	register,
	login,
	updateUserSetting,
};
