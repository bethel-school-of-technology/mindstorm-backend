const mongoose = require("mongoose");

// Comment schema model
const commentSchema = mongoose.Schema({
  postTitle: { type: String, required: true },
  postBody: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Comment", commentSchema);
