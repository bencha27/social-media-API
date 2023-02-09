const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require("../../controllers/userController");

// Endpoint: /api/users
router.route("/")
  .get(getUsers)
  .post(createUser);

// Endpoint: /api/users/:userId
router.route("/:userId")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Endpoint: /api/users/:userId/friends/:friendId

module.exports = router;