const express = require("express");
const Character = require("../models/character");
const checkUser = require("../middleware/check-user");

const router = express.Router();

/**
 * Performs the PUT method for editing a character trait and authorizes user
 */
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

/**
 * Performs the GET method for retrieving a character trait
 */
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

/**
 * Performs the GET method for retrieving a character trait by its id
 */
router.get("/:id", (req, res, next) => {
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

/**
 * Performs the POST method for creating a character traits and authorizes user
 */
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

/**
 * Performs a DELETE method for deleting a character trait by its id and authorizes user
 */
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
