const User = require("../models/user.js");

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

module.exports = {
	register,
};
