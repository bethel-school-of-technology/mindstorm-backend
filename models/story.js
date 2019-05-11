const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
    storytitle: { type: String, required: true },
    storybody: { type: String, required: false }
});

module.exports = mongoose.model("Story", storySchema);