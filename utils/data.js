const userData = [
    {
      username: "user1",
      email: "user1@example.com",
      thoughts: [],
      friends: [] 
    },
    {
      username: "user2",
      email: "user2@example.com",
      thoughts: [],
      friends: []
    }
  ];
  
  const thoughtData = [
    {
      thoughtText: "This is a thought by user1",
      username: "user1",
      reactions: [
        { reactionBody: "Interesting!", username: "user2" },
        { reactionBody: "I agree!", username: "user3" }
      ]
    },
    {
      thoughtText: "Another thought by user2",
      username: "user2",
      reactions: [
        { reactionBody: "Nice thought!", username: "user1" },
        { reactionBody: "I disagree.", username: "user3" }
      ]
    }
  ];
  
  module.exports = { userData, thoughtData };