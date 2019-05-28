const mongoose = require("mongoose");

/**
 * Story Schema model.
 */
const storySchema = mongoose.Schema({
  storyTitle: { type: String, required: true },
  storyBody: { type: String, required: false },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Story", storySchema);
