const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { usersData, thoughtsData, reactionsData } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Add thoughts to the collection
  for (let i = 0; i < thoughtsData.length; i++) {
    thoughtsData[i].reactions = reactionsData;
  }
  await Thought.collection.insertMany(thoughtsData);

  // Add users to the collection
  for (let i = 0; i < usersData.length; i++) {
    usersData[i].thoughts = thoughtsData[i];
  }
  await User.collection.insertMany(usersData);

  // Log out the seed data to indicate what should appear in the database
  console.table(thoughtsData);
  console.table(usersData);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});