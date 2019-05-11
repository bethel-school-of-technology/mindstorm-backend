const express = require("express");
const Comment = require("../models/comment");

const router = express.Router();

// GET list of comments
router.get("", (req, res, next) => {
  Comment.find().then(docs => {
    res.status(200).json({
      comments: docs,
      message: "Comments were found!"
    });
  });
});

// GET comment by id
router.get("/:id", (req, res, next) => {
  Comment.findById(req.params.id).then(comment => {
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: "Comment not found!" });
    }
  });
});

// POST a comment
router.post("", (req, res, next) => {
  const comment = new Comment({
    posttitle: req.body.posttitle,
    postbody: req.body.postbody
  });
  comment.save().then(commentCreated => {
    res.status(201).json({
      commentId: commentCreated._id,
      message: "Comment created!"
    });
  });
});

// PUT a comment
router.put("/:id", (req, res, next) => {
  const comment = new Comment({
    _id: req.body.id,
    posttitle: req.body.posttitle,
    postbody: req.body.postbody
  });
  Comment.updateOne({ _id: req.params.id }, comment).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

// Delete method
router.delete("/:id", (req, res, next) => {
  Comment.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Comment deleted!" });
  });
});

module.exports = router;
