const Comment = require('../models/comment');

// @route   POST api/comments
// @desc    Create comments
// @access  Private
// @routes  comments.js
exports.createComment = (req, res, next) => {
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
          message: 'Comment created!'
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating a comment failed!'
      });
    });
};

// @route   PUT api/comments/:id
// @desc    Edit comments
// @access  Private
// @routes  comments.js
exports.updateComment = (req, res, next) => {
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
        res.status(200).json({ message: 'Update successful!' });
      } else {
        res.status(401).json({ message: "You're not the creator!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update comment!"
      });
    });
};

// @route   GET api/comments/:id
// @desc    Get comment
// @access  Private
// @routes  comments.js
exports.getComment = (req, res, next) => {
  Comment.findById(req.params.id)
    .then(comment => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({ message: 'Comment not found!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching comment failed!'
      });
    });
};

// @route   GET api/comments
// @desc    Get comments
// @access  Public
// @routes  comments.js
exports.getComments = (req, res, next) => {
  Comment.find()
    .then(docs => {
      res.status(200).json({
        comments: docs,
        message: 'Comments found!'
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching characters failed!'
      });
    });
};

// @route   DELETE api/comments/:id
// @desc    Delete comments
// @access  Private
// @routes  comments.js
exports.deleteComment = (req, res, next) => {
  Comment.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: 'Comment deleted!' });
      } else {
        res.status(401).json({ message: "You're not the creator!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching characters failed!'
      });
    });
};
