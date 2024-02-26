const { User, Thought } = require("../models");

module.exports = {
    async getUsers (req, res) {
        try {
            const users = await User.find().populate("thoughts");

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });

            if(!user) {
                return res.status(404).json({ message: "Could not find user" });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser (req, res) {
        try {
            const newUser = await User.create(req.body);

            res.json({ message: "User created successfully"}, newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true }
            );

            if(user) {
                return res.status(404).json({ message: "Could not find user" });
            }

            res.json({ message: "User updated successfully"}, user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser (req, res) {
        try {
            const user = await User.findByIdAndDelete({ _id: req.params.userId});

            if(!user) {
                return res.status(404).json({ message: "Could not find user" });
            }

            res.json({ message: "User deleted successfully"});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend (req, res) {
        try {
            const user = User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                { new: true }
            );

            if(!user) {
                return res.status(404).json({ message: "Could not find user" });
            }

            res.json({ message: "Friend added successfully"}, user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteFriend (req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { new: true }
            );

            if(!user) {
                return res.status(404).json({ message: "Could not find thought" });
            }

            res.json( { message: "Friend removed successfully"});
        } catch (err) {
            res.status(500).json(err);
        }
    }
}