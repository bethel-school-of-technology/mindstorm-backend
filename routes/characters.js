const express = require('express');
const Character = require('../models/character');

const router = express.Router();

// GET list of characters
router.get("", (req, res, next) => {
    const queryCharacter = Character.find();
    const pageSize = +req.query.page;
    const onPage = +req.query.page;
    let getCharacters;
    if (pageSize && onPage) {
        queryCharacter.skip(pageSize * (onPage - 1))
        .limit(pageSize);
    }
    queryCharacter.then(docs => {
        getCharacters = docs;
        return Character.count();
    })
    .then(count => {
        res.status(200).json({
            message: "Characters United!",
            characters: getCharacters,
            maxCharacters: count
        });
    });
});