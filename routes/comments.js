const express = require("express");
const Comment = require("../models/comment");
const checkUser = require("../middleware/check-user");

const router = express.Router();

/**
 * Performs the GET method for retrieving a comment.
 */
router.get("", (req, res, next) => {
  Comment.find().then(docs => {
    res.status(200).json({
      comments: docs,
      message: "Comments found!"
    })
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching characters failed!"
    });
  });
});

/**
 * Performs the GET method for retrieving a comment by its id.
 */
router.get("/:id", (req, res, next) => {
  Comment.findById(req.params.id)
    .then(comment => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({ message: "Comment not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching comment failed!"
      });
    });
});

/**
 * Performs the POST method for creating a comment and authorizes user.
 */
router.post("", checkUser, (req, res, next) => {
  const comment = new Comment({
    postTitle: req.body.postTitle,
    postBody: req.body.postBody,
    creator: req.userData.userId
  });
  comment
    .save()
    .then(commentCreated => {
      res.status(201).json({
        comment: {
          ...commentCreated,
          commentId: commentCreated._id,
          message: "Comment created!"
        }
      });
  })
  .catch(error => {
    res.status(500).json({
      message: "Creating a comment failed!"
    });
  });
});

/**
 * Performs the PUT method for editing a comment and authorizes user.
 */
router.put("/:id", checkUser, (req, res, next) => {
  const comment = new Comment({
    _id: req.body.id,
    postTitle: req.body.postTitle,
    postBody: req.body.postBody,
    creator: req.userData.userId
  });
  Comment.updateOne(
    { _id: req.params.id, creator: req.userData.userId }, 
    comment
  )
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "You're not the creator!"})
      }
  })
  .catch(error => {
    res.status(500).json({
      message: "Couldn't update comment!"
    });
  });
});

/**
 * Performs a DELETE method for deleting a comment by its id and authorizes user.
 */
router.delete("/:id", checkUser, (req, res, next) => {
  Comment.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Comment deleted!" });
      } else {
        res.status(401).json({ message: "You're not the creator!"})
      }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching characters failed!"
    });
  });
});

module.exports = router;
