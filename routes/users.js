const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');
const UsersController = require('../controllers/users');
const passportJWT = passport.authenticate('jwt', {session: false});

router.route('/signup')
  .post(UsersController.signUp);

router.route('/signin')
  .post(passport.authenticate('local', {session: false}), UsersController.signIn);

router.route('/posts')
  .get(passportJWT, UsersController.getPosts);

module.exports = router;