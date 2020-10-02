const User = require('../models/users');

module.exports = {
  signUp: async(req, res, next) => {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if(foundUser) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    const newUser = new User({ email, password })
    await newUser.save();
    res.json({ user: 'created' })
    console.log(newUser);
  },

  signIn: async(req, res, next) => {
  },

  getPosts: async(req, res, next) => {
  }
}