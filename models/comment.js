const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  posttitle: { type: String, required: true },
  postbody: { type: String, required: true }
});

module.exports = mongoose.model("Comment", commentSchema);
