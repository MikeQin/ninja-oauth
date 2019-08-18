const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20/');
const { google } = require('./keys');
const User = require('../models/user');

passport.serializeUser((user, done) => {
  console.log('passport.serializeUser...');
  console.log("user.id", user.id);
  console.log("user._id", user._id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('passport.deserializeUser...');
  User.findById(id).then((user) => {
    console.log('user from cookie', user);
    done(null, user);
  }).catch(err => {
    console.log(err);
  })
});

passport.use(new GoogleStrategy({
  // options for the google strategy
  callbackURL: '/auth/google/redirect',
  clientID: google.clientID,
  clientSecret: google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
  // passport callback
  console.log("passport callback fired...");
  console.log('accessToken', accessToken);
  console.log('profile', profile);

  User.findOne({ userId: profile.id }).then((currentUser) => {
    if (currentUser) {
      // already have the user
      console.log('[*] current user', currentUser);
      done(null, currentUser);
    }
    else {
      // create a new user
      User.create({
        userName: profile.displayName,
        userId: profile.id,
        thumbnail: profile._json.picture
      }).then((user) => {
        console.log('[*] new user created', user);
        done(null, user);
      }).catch((error) => {
        console.log(error);
      });
    }
  })


})
);