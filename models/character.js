const mongoose = require("mongoose");

const characterSchema = mongoose.Schema({
  title: { type: String, required: true },
  detail: { type: String, required: false },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Character", characterSchema);
