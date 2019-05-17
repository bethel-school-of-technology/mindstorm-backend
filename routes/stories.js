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
        storyTitle: req.body.storyTitle,
        storyBody: req.body.storyBody
    });
    story.save().then(createdStory => {
        res.status(201).json({
            message: "Story added!",
            storyId: createdStory._id
        });
    });
});

router.get("/:id", (req, res, next) => {
    Story.findById(req.params.id).then(story => {
        if (story) {
            res.status(200).json(story);
        } else {
            res.status(404).json({ 
                message: "Story not found!"
            });
        }
    });
});

router.put("/:id", (req, res, next) => {
    const story = new Story ({
        _id: req.body.id,
        storyTitle: req.body.storyTitle,
        storyBody: req.body.storyBody
    });
    Story.updateOne({
        _id: req.params.id
    }, story)
        .then(result => {
            res.status(200).json({ 
                message: "Story updated!" 
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Story.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({
            message: "Story removed!"
        });
    });
});

module.exports = router;