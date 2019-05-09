const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
    title: { type: String, required: true },
    detail: { type: String, required: false }
});

module.exports = mongoose.model("Character", characterSchema);