const express = require('express');

const UserController = require('../controllers/user');

const router = express.Router();

// @route           POST api/user/signup
// @desc            Signup user
// @access          Public
// @controllers     user.js
router.post('/signup', UserController.createUser);

// @route           POST api/user/login
// @desc            Login user
// @access          Public
// @controllers     user.js
router.post('/login', UserController.userLogin);

module.exports = router;
