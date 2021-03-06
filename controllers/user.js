const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// @route      POST api/user/signup
// @desc       Signup user
// @access     Public
// @routes     user.js
exports.createUser = (req, res, next) => {
  bcryptjs.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: 'User created!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: 'You already have an account here with such email!'
        });
      });
  });
};

// @route     POST api/user/login
// @desc      Login user
// @access    Public
// @routes    user.js
exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Either password or email isn't right. Or both."
        });
      }
      fetchedUser = user;
      return bcryptjs.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Either password or email isn't right. Or both."
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Either password or email isn't right. Or both."
      });
    });
};
