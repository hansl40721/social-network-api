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

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser (req, res) {
        try {
            const newUser = await User.create(req.body);

            res.status(200).json(newUser);
        } catch (err) {
            console.log(err);
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

            if(!user) {
                return res.status(404).json({ message: "Could not find user" });
            }

            res.status(200).json(user);
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

            res.status(200).json(user);
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

            res.status(200).json(user);
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