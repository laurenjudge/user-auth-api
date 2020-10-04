const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');
const UsersController = require('../controllers/users');
const passportJWT = passport.authenticate('jwt', {session: false});

router.route('/signup')
  .post(UsersController.signUp);

router.route('/signin')
  .post(UsersController.signIn);

router.route('/posts')
  .get(passportJWT, UsersController.getPosts);

module.exports = router;