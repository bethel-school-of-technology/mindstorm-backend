const express = require('express');
const multer = require('multer');

const StoryController = require('../controllers/stories');
const checkUser = require('../middleware/check-user');

const router = express.Router();

// Images file types
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

// Specifies image storage and file type validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid image type');
    if (isValid) {
      error = null;
    }
    cb(error, 'images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

// @route         POST api/stories
// @desc          Create stories
// @access        Private
// @controllers   stories.js
router.post(
  '',
  checkUser,
  multer({ storage: storage }).single('image'),
  StoryController.createStory
);

// @route         PUT api/stories/:id
// @desc          Edit stories
// @access        Private
// @controllers   stories.js
router.put(
  '/:id',
  checkUser,
  multer({ storage: storage }).single('image'),
  StoryController.updateStory
);

// @route         GET api/stories
// @desc          Get stories
// @access        Public
// @controllers   stories.js
router.get('', StoryController.getStories);

// @route         GET api/stories/:id
// @desc          Get story
// @access        Private
// @controllers   stories.js
router.get('/:id', checkUser, StoryController.getStory);

// @route         DELETE api/stories/:id
// @desc          Delete stories
// @access        Private
// @controllers   stories.js
router.delete('/:id', checkUser, StoryController.deleteStory);

module.exports = router;
