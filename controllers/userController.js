const { User, Thought } = require("../models");

// Find all users
async function getUsers (req, res) {
  try {
    const userData = await User.find().select("-__v");
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new user
async function createUser (req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Find a user by ID
async function getUserById (req, res) {
  try {
    const userData = await User.findById({ _id: req.params.userId }).select("-__v");
    if (!userData) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a user by ID
async function updateUser (req, res) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true },
    );
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a user by ID
async function deleteUser (req, res) {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await Thought.deleteMany({ _id: { $in: deletedUser.thoughts }});
    res.status(200).json({ message: "User and thoughts deleted"});
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add a friend to a user
async function addFriend (req, res) {};

// Delete a friend from a user
async function deleteFriend (req, res) {};

module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser, addFriend, deleteFriend };