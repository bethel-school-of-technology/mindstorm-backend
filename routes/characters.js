const express = require('express');
const Character = require('../models/character');

const router = express.Router();

// GET list of characters
router.get("", (req, res, next) => {
   Character.find().then(docs => {
       res.status(200).json({
           characters: docs,
           message: "Characters United!"
       });
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