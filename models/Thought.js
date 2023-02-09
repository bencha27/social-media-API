const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create "Thought" model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    timestamps: true,
    virtuals: {
      reactionCount: {
        get() {
          return this.reactions.length;
        }
      }
    },
  },
)

// Create "Thought" model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;