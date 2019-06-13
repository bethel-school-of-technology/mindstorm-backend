const Story = require('../models/story');

// @route   POST api/stories
// @desc    Create stories
// @access  Private
// @routes  stories.js
exports.createStory = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const story = new Story({
    storyTitle: req.body.storyTitle,
    storyBody: req.body.storyBody,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.userId
  });
  story
    .save()
    .then(createdStory => {
      res.status(201).json({
        message: 'Story added!',
        story: {
          ...createdStory,
          id: createdStory._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating a story failed!'
      });
    });
};

// @route   PUT api/stories/:id
// @desc    Edit stories
// @access  Private
// @routes  stories.js
exports.updateStory = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }
  const story = new Story({
    _id: req.body.id,
    storyTitle: req.body.storyTitle,
    storyBody: req.body.storyBody,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  console.log(story);
  Story.updateOne(
    {
      _id: req.params.id,
      creator: req.userData.userId
    },
    story
  )
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Update successful!' });
      } else {
        res.status(401).json({ message: 'Not the creator!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update story!"
      });
    });
};

// @route   GET api/stories
// @desc    Get stories
// @access  Public
// @routes  stories.js
exports.getStories = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const storyQuery = Story.find();
  let fetchedStories;
  if (pageSize && currentPage) {
    storyQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  storyQuery
    .then(docs => {
      fetchedStories = docs;
      return Story.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: 'Stories Retrieved!',
        stories: fetchedStories,
        maxStories: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching stories failed!'
      });
    });
};

// @route   GET api/stories/:id
// @desc    Get story
// @access  Private
// @routes  stories.js
exports.getStory = (req, res, next) => {
  Story.findById(req.params.id)
    .then(story => {
      if (story) {
        res.status(200).json(story);
      } else {
        res.status(404).json({
          message: 'Story not found!'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching stories failed!'
      });
    });
};

// @route    DELETE api/stories/:id
// @desc     Delete stories
// @access   Private
// @croutes  stories.js
exports.deleteStory = (req, res, next) => {
  Story.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: 'Story deleted!' });
      } else {
        res.status(401).json({ message: 'Not the creator!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching stories failed!'
      });
    });
};
