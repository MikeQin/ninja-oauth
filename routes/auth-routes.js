const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

/*
authentication with goole:
  1. user authenticates with google (username, password), google returns auth_code
  2. browser sends auth_code, node server then sends (auth_code, clientId, clientSecret) 
     and {scope: ['profile']} to google
  3. google validates (auth_code, clientId, clientSecret), then returns access_token, and profile in callback
  4. google redirects the request to redirect_url
*/
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile/');
});

module.exports = router;