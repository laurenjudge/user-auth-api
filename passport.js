const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/users');
const JWT_SECRET = process.env.JWT_SECRET;


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
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