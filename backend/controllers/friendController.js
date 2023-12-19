// Models
const User = require("../models/user");

// Add someone to friends list
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
        } else if(userId === friendId) {
            return res.status(404).json({ error: "You cannot be friends with yourself" });
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
    } catch (error) {
        // Catch any errors
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Returns the users list of friends
const getAllFriends = async (req, res) => {
    try {
        const { userId } = req.body;

        // Make sure all fields are filled in request body
        if (!userId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Make sure user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Get all friends
        // $in operator to find all users whose _id is in the user's friends array
        const friends = await User.find({ _id: { $in: user.friends } },
            {username:1, firstName: 1, lastName: 1});

        if(friends.length === 0) {
            return res.status(200).json({ message: "You don't have any friends yet. " });
        }

        res.json(friends);
    } catch (error){
        // Catch any errors
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Remove a friend from the user's friends list
const removeFriend = async (req, res) => {
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

        // Make sure they are already friends
        if (!user.friends.includes(friendId)) {
            return res.status(400).json({ error: "Users are not friends" });
        }

        // Remove the friend from the user
        user.friends.pull(friendId);

        // For now, remove the user from the friend
        friend.friends.pull(userId);

        // Save changes to the DB
        await user.save();
        await friend.save();

        res.json({ message: "Friend removed successfully" });
    } catch (error){
        // Catch any errors
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    addFriend,
    getAllFriends,
    removeFriend,
};