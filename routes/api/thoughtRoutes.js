const router = require("express").Router();
const {
  getThoughts,
  createThought,
  getThoughtById,
  updateThought,
  deleteThought
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

module.exports = router;