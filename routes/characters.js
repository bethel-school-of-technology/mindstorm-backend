const express = require("express");
const Character = require("../models/character");

const router = express.Router();

// PUT a charatcter
router.put("/:id", (req, res, next) => {
  const character = new Character({
    _id: req.body.id,
    title: req.body.title,
    detail: req.body.detail
  });
  Character.updateOne({ _id: req.params.id }, character).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

// GET list of characters
router.get("", (req, res, next) => {
  Character.find().then(docs => {
    res.status(200).json({
      characters: docs,
      message: "Characters United!"
    });
  });
});

// GET character by id
router.get("/:id", (req, res, next) => {
  Character.findById(req.params.id).then(character => {
    if (character) {
      res.status(200).json(character);
    } else {
      res.status(404).json({ message: "Character not found!" });
    }
  });
});

// POST a character
router.post("", (req, res, next) => {
  const character = new Character({
    title: req.body.title,
    detail: req.body.detail
  });
  post.save().then(charCreated => {
    res.status(201).json({
      characterId: charCreated._id,
      message: "Character created!"
    });
  });
});

// Delete method
router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Character deleted!" });
  });
});
