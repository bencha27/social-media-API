const router = require("express").Router();
const {
  getThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require("../../controllers/thoughtController");

// Endpoint: /api/thoughts
router.route("/")
  .get(getThoughts)
  .post(createThought);

// Endpoint: /api/thoughts/:thoughtId
router.route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Endpoint: /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions")
  .post(addReaction)

// Endpoint: /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId")
  .delete(deleteReaction);

module.exports = router;