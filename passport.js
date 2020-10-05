const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('./models/users');

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
}, async(payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false)
    }
    done(null, user);
  } catch(error) {
    done(error, false)
  }
}))

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async(email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if(! user) {
      return done(null, false);
    }
    const isValid = await user.isValidPassword(password);
    if(!isValid) {
      return done(null, false);
    }
    done(null, user);
  } catch(error) {
    done(error, false);
  }
  
}))

passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, async(accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ id:profile.id })
    if(existingUser) {
      return done(null, existingUser);
    }
    const newUser = new User({
      method: 'google',
      id: profile.id,
      email: profile.emails[0].value
    });

    console.log(profile);
  
    await newUser.save();
    done(null, newUser);
  } catch(error) {
    done(error, false);
  }
}))

passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET
}, async(accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ id:profile.id })
    if(existingUser) {
      return done(null, existingUser);
    }
    const newUser = new User({
      method: 'facebook',
      id: profile.id,
      email: profile.emails[0].value
    });
  
    await newUser.save();
    done(null, newUser);
  } catch(error) {
    done(error, false);
  }
}))