const usersData = [
  {
    username: "user1",
    email: "user1@email.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "user2",
    email: "user2@email.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "user3",
    email: "user3@email.com",
    thoughts: [],
    friends: [],
  },
];

const thoughtsData = [
  {
    thoughtText: "user1 thought1",
    username: "user1",
    reactions: [],
  },
  {
    thoughtText: "user2 thought1",
    username: "user2",
    reactions: [],
  },
  {
    thoughtText: "user3 thought1",
    username: "user3",
    reactions: [],
  },
];

const reactionsData = [
  {
    reactionBody: "user1 like",
    username: "user1",
  },
  {
    reactionBody: "user2 dislike",
    username: "user2",
  },
  {
    reactionBody: "user3 love",
    username: "user3",
  },
];

module.exports = { usersData, thoughtsData, reactionsData }