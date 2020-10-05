const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConfig = require('../passport');
const UsersController = require('../controllers/users');
const localAuth = passport.authenticate('local', {session: false});
const passportJWT = passport.authenticate('jwt', {session: false});
const googleOAuth = passport.authenticate('googleToken', {session: false});
const facebookOAuth = passport.authenticate('facebookToken', {session: false});


router.route('/signup')
  .post(UsersController.signUp);

router.route('/signin')
.post(localAuth, UsersController.signIn);

router.route('/google') 
  .post(googleOAuth, UsersController.signIn);

  router.route('/facebook') 
  .post(facebookOAuth, UsersController.signIn);

router.route('/protected-route')
  .get(passportJWT, UsersController.getProtectedData);

module.exports = router;