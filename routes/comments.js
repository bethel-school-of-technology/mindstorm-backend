const express = require('express');

const CommentController = require('../controllers/comments');
const checkUser = require('../middleware/check-user');

const router = express.Router();

// @route         POST api/comments
// @desc          Create comments
// @access        Private
// @controllers   comments.js
router.post('', checkUser, CommentController.createComment);

// @route         PUT api/comments/:id
// @desc          Edit comments
// @access        Private
// @controllers   comments.js
router.put('/:id', checkUser, CommentController.updateComment);

// @route         GET api/comments
// @desc          Get comments
// @access        Public
// @controllers   comments.js
router.get('', CommentController.getComments);

// @route         GET api/comments/:id
// @desc          Get comment
// @access        Private
// @controllers   comments.js
router.get('/:id', checkUser, CommentController.getComment);

// @route         DELETE api/comments/:id
// @desc          Delete comments
// @access        Private
// @controllers   comments.js
router.delete('/:id', checkUser, CommentController.deleteComment);

module.exports = router;
