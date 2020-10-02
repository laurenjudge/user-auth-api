const JWT = require('jsonwebtoken');
const User = require('../models/users');

signToken = user => {
  return JWT.sign({
    iss: 'SiteName',
    sub: user._id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'placeholderforlongsecretpassword');
}

module.exports = {
  signUp: async(req, res, next) => {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if(foundUser) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    const newUser = new User({ email, password })
    await newUser.save();

    const token = signToken(newUser);

    res.status(200).json({ token });
  },

  signIn: async(req, res, next) => {
  },

  getPosts: async(req, res, next) => {
  }
}