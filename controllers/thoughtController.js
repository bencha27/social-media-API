const { Thought, User, Reaction } = require("../models");

// Find all thoughts
async function getThoughts (req, res) {
  try {
    const thoughtData = await Thought.find().select("-__v");
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new thought
async function createThought (req, res) {
  try {
    const newThought = await Thought.create(req.body);
    // Update the user with the ID of the thought
    const thoughtUser = await User.findOneAndUpdate(
      { username: req.body.username },
      { $addToSet: { thoughts: newThought._id }},
      { new: true },
    );
    if (!thoughtUser) {
      res.status(404).json({ message: "Thought created, but user not found "});
      return;
    }
    res.status(200).json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Find a thought by ID
async function getThoughtById (req, res) {
  try {
    const thoughtData = await Thought.findById({ _id: req.params.thoughtId }).select("-__v");
    if (!thoughtData) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a thought by ID
async function updateThought (req, res) {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true },
    );
    if (!updatedThought) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }
    res.status(200).json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a thought by ID
async function deleteThought (req, res) {
  try {
    const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    if (!deletedThought) {
      res.status(404).json({ message: "Thought not found" });
      return;
    }
    // Delete associated reactions?

    res.status(200).json({ message: "Thought deleted"});
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a reaction to a thought
async function addReaction (req, res) {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body }},
      { new: true },
    );
    if (!updatedThought) {
      res.status(404).json({ message: "Thought not found "});
      return;
    }
    res.status(200).json({ message: "Added a reaction" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a reaction from a thought
async function deleteReaction (req, res) {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId} }},
      { new: true },
    );
    if (!updatedThought) {
      res.status(404).json({ message: "Thought not found "});
      return;
    }
    res.status(200).json({ message: "Removed a reaction" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getThoughts, createThought, getThoughtById, updateThought, deleteThought, addReaction, deleteReaction };