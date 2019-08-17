const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20/');
const { google } = require('./keys');

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

  //done();
})
);