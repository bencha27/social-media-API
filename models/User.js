const { Schema, model } = require("mongoose");

// Schema to create "User" model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
        unique: true,
      }
    ],
    numFriends: { type: Number},
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        unique: true,
      }
    ],
  },
  {
   virtuals: {
    friendCount: {
      get() {
        return this.friends.length;
      }
    }
   },
  }
);

// Create "User" model
const User = model("User", userSchema);

module.exports = User;