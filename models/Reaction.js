const { Schema, Types } = require("mongoose");

// Embedded document schema for reactions
const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = reactionSchema;