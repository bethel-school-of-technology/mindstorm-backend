const express = require('express');

const CharacterController = require('../controllers/characters');
const checkUser = require('../middleware/check-user');

const router = express.Router();

// @route         GET api/characters
// @desc          Create characters
// @access        Private
// @controllers   characters.js
router.post('', checkUser, CharacterController.createCharacter);

// @route         PUT api/characters/:id
// @desc          Edit character
// @access        Private
// @controllers   characters.js
router.put('/:id', checkUser, CharacterController.updateCharacter);

// @route         GET api/characters
// @desc          Get characters
// @access        Private
// @controllers   characters.js
router.get('', checkUser, CharacterController.getCharacters);

// @route         GET api/characters/:id
// @desc          Get a character by id
// @access        Private
// @controllers   characters.js
router.get('/:id', checkUser, CharacterController.getCharacter);

// @route         DELETE api/characters/:id
// @desc          Delete character
// @access        Private
// @controllers   characters.js
router.delete('/:id', checkUser, CharacterController.deleteCharacter);

module.exports = router;
