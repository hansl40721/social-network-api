const connection = require('../config/connection');
const { userData, thoughtData } = require('./data');
const { User, Thought } = require('../models');

connection.once('open', async () => {
    try {
        await User.deleteMany({});
        await Thought.deleteMany({});

        const users = await User.insertMany(userData);

        const thoughts = [];
        for (const thought of thoughtData) {
            const user = users.find(user => user.username === thought.username);
        
            if(user) {
                const newThought = new Thought({
                    thoughtText: thought.thoughtText,
                    username: user._id
                });

                for(const reactionData of thought.reactions) {
                    newThought.reactions.push({
                        reactionBody: reactionData.reactionBody,
                        username:reactionData.username
                    });
                }

                await newThought.save();
                thoughts.push(newThought);
                user.thoughts.push(newThought);
                await user.save();
            }
        }

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        connection.close();
    }
});