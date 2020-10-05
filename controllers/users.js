const JWT = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/users');
const JWT_SECRET = process.env.JWT_SECRET;

signToken = user => {
  return JWT.sign({
    iss: 'SiteName',
    sub: user._id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, JWT_SECRET);
}

module.exports = {
  signUp: async(req, res, next) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if(foundUser) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    const newUser = new User({ 
      method: 'local',
      email: email, 
      password: password
    })

    await newUser.save();

    const token = signToken(newUser);

    res.status(200).json({ token });
  },

  signIn: async(req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token })
  },

  getProtectedData: async(req, res, next) => {
    res.json({posts: "You are authorized to fetch data"})
  }
}