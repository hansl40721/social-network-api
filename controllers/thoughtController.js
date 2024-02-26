const { User, Thought } = require('../models');

module.exports = {
    async getThoughts (req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getOneThought (req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId});

            if(!thought) {
                return res.status(404).json({ message: "Could not find thought" });
            }

            res.json(thought);
        } catch (err) {
            res.status(500),json(err);
        }
    },

    async createThought (req, res) { 
        try {   
            const newThought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: newThought._id}},
                { new: true }
            );

            if(!user) {
                return res.status(404).json({ message: "Could not find user"});
            }

            res.json({ message: "Thought created successfully" }, newThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought (req, res) { 
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true }
            );

            if(!thought) {
                res.status(404).json({ message: "Could not find thought" });
            }

            res.json({ message: "Thought updated successfully" }, thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought (req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if(!thought) {
                res.status(404).json({ message: "Could not find thought"});
            }

            res.json({ message: "Thought deleted successfully" });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createReaction (req, res) { 
        try {
            const newReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { new: true } 
            );

            if(!newReaction) {
                res.status(404).json({ message: "Could not find thought"});
            }

            res.json(newReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction (req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId }}}
            );

            if(!thought) {
                res.status(404).json({ message: "Could not find thought"});
            }

            res.json({ message: "Reaction successfully deleted" });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}