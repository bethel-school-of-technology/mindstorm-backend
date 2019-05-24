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
    { _id: req.params.id, creator: req.userData.userId },
    character
  ).then(result => {
    if (result.nModified > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not the creator!" });
    }
  });
});

/**
 * Performs the GET method for retrieving a character trait
 */
router.get("", (req, res, next) => {
  Character.find().then(docs => {
    res.status(200).json({
      characters: docs,
      message: "Characters United!"
    });
  });
});

/**
 * Performs the GET method for retrieving a character trait by its id
 */
router.get("/:id", (req, res, next) => {
  Character.findById(req.params.id).then(character => {
    if (character) {
      res.status(200).json(character);
    } else {
      res.status(404).json({ message: "Character not found!" });
    }
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
  character.save().then(charCreated => {
    res.status(201).json({
      character: {
        ...charCreated,
        characterId: charCreated._id,
        message: "Character created!"
      }
    });
  });
});

/**
 * Performs a DELETE method for deleting a character trait by its id and authorizes user
 */
router.delete("/:id", checkUser, (req, res, next) => {
  Character.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    if (result.n > 0) {
      res.status(200).json({ message: "Character deleted!" });
    } else {
      res.status(401).json({ message: "Not the creator!" });
    }
  });
});

module.exports = router;
