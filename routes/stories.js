const express = require("express");
const multer = require("multer");
const Story = require("../models/story");
const checkUser = require("../middleware/check-user");

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid image type");
    if (isValid) {
      error = null;
    }
    cb(error, "images");
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

// Performs a POST method for creating a story, uploading an image, and authorizes user
router.post(
  "", 
  checkUser, 
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const story = new Story({
      storyTitle: req.body.storyTitle,
      storyBody: req.body.storyBody,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.userData.userId
    });
    story.save()
      .then(createdStory => {
        res.status(201).json({
          message: "Story added!",
          story: {
            ...createdStory,
            id: createdStory._id
          }
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Creating a story failed!"
        });
      });
});

// Performs a PUT method for editing a story and authorizes user
router.put(
  "/:id", 
  checkUser, 
  multer({ storage: storage }).single("image"), 
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
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

// Performs a GET method for retrieving stories
router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const storyQuery = Story.find();
  let fetchedStories;
  if (pageSize && currentPage) {
    storyQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  storyQuery.then(docs => {
    fetchedStories = docs
    return Story.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: "Stories Retrieved!",
      stories: fetchedStories,
      maxStories: count
    });
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching stories failed!"
      });
    });
});


// Performs a GET method for retrieving a story by its id
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

// Performs a DELETE method for deleting a story by its id and authorizes user
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
