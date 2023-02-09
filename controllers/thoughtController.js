const { Thought } = require("../models");

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

module.exports = { getThoughts, createThought, getThoughtById, updateThought, deleteThought };