const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  postTitle: { type: String, required: true },
  postBody: { type: String, required: true }
});

module.exports = mongoose.model("Comment", commentSchema);
