const express = require("express");
const Character = require("../models/character");
const checkUser = require("../middleware/check-user");

const router = express.Router();

// @route   PUT api/characters/:id
// @desc    Edit character
// @access  Private
router.put("/:id", checkUser, (req, res, next) => {
  const character = new Character({
    _id: req.body.id,
    title: req.body.title,
    detail: req.body.detail,
    creator: req.userData.userId
  });
  Character.updateOne(
    { 
      _id: req.params.id, 
      creator: req.userData.userId 
    },
    character
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
        message: "Couldn't update character!"
      });
    });
});

// @route   GET api/characters
// @desc    Get characters
// @access  Private
router.get("", checkUser, (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const characterQuery = Character.find();
  let fetchedCharacters;
  if (pageSize && currentPage) {
    characterQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  characterQuery.then(docs => {
    fetchedCharacters = docs
    return Character.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: "Characters Retrieved!",
      characters: fetchedCharacters,
      maxCharacters: count
      });
    })
      .catch(error => {
        res.status(500).json({
          message: "Fetching characters failed!"
      });
    });
});

// @route   GET api/characters/:id
// @desc    Get a character by id
// @access  Private
router.get("/:id", checkUser, (req, res, next) => {
  Character.findById(req.params.id)
    .then(character => {
      if (character) {
        res.status(200).json(character);
      } else {
        res.status(404).json({ message: "Character not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching character failed!"
      });
    });
});

// @route   GET api/characters
// @desc    Create characters
// @access  Private
router.post("", checkUser, (req, res, next) => {
  const character = new Character({
    title: req.body.title,
    detail: req.body.detail,
    creator: req.userData.userId
  });
  character.save()
    .then(charCreated => {
      res.status(201).json({
        message: "Character created!",
        character: {
          ...charCreated,
          id: charCreated._id,
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a character failed!"
      });
    });
});

// @route   DELETE api/characters/:id
// @desc    Delete character
// @access  Private
router.delete("/:id", checkUser, (req, res, next) => {
  Character.deleteOne({ _id: req.params.id , creator: req.userData.userId})
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Character deleted!" });
      } else {
        res.status(401).json({ message: "Not the creator!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching characters failed!"
      });
    });
});

module.exports = router;
