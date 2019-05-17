const mongoose = require("mongoose");

const storySchema = mongoose.Schema({
    storyTitle: { type: String, required: true },
    storyBody: { type: String, required: false }
});

module.exports = mongoose.model("Story", storySchema);