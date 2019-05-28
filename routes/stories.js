const express = require("express");
const Story = require("../models/story");
const checkUser = require("../middleware/check-user");

const router = express.Router();

/**
 * Performs the GET method for retrieving a stories
 */
router.get("", (req, res, next) => {
  Story.find().then(docs => {
    res
      .status(200)
      .json({
        message: "Stories Retrieved!",
        stories: docs
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching stories failed!"
        });
      });
  });
});

/**
 * Performs the POST method for creating a story and authorizes user
 */
router.post("", checkUser, (req, res, next) => {
  const story = new Story({
    storyTitle: req.body.storyTitle,
    storyBody: req.body.storyBody,
    creator: res.userData.userId
  });
  story
    .save()
    .then(createdStory => {
      res.status(201).json({
        story: {
          ...createdStory,
          message: "Story added!",
          storyId: createdStory._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a story failed!"
      });
    });
});

/**
 * Performs the GET method for retrieving a story by its id
 */
router.get("/:id", (req, res, next) => {
  Story.findById(req.params.id)
    .then(story => {
      if (story) {
        res.status(200).json(story);
      } else {
        res.status(404).json({
          message: "Story not found!"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching stories failed!"
      });
    });
});

/**
 * Performs the PUT method for editing a story and authorizes user
 */
router.put("/:id", checkUser, (req, res, next) => {
  const story = new Story({
    _id: req.body.id,
    storyTitle: req.body.storyTitle,
    storyBody: req.body.storyBody,
    creator: req.userData.userId
  });
  Story.updateOne(
    {
      _id: req.params.id,
      creator: req.userData.userId
    },
    story
  )
    .then(result => {
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not the creator!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update story!"
      });
    });
});

/**
 * Performs a DELETE method for deleting a story by its id and authorizes user
 */
router.delete("/:id", checkUser, (req, res, next) => {
  Story.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Story deleted!" });
      } else {
        res.status(401).json({ message: "Not the creator!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching stories failed!"
      });
    });
});

module.exports = router;
