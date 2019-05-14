const express = require("express");
const Story = require("../models/story")

const router = express.Router();

router.get("", (req, res, next) => {
    Story.find().then(docs => {
        res.status(200).json({
            message: "Stories Retrieved!",
            stories: docs
        });
    });
});

router.post("", (req, res, next) => {
    const story = new Story({
        storytitle: req.body.storytitle,
        storybody: req.body.storybody
    });
    story.save().then(createdStory => {
        res.status(201).json({
            message: "Story added!",
            storyId: createdStory._id
        });
    });
});