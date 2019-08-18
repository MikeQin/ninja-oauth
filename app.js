const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const { mongodb, session } = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// set view engine
app.set('view engine', 'ejs');

// use cookie
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [session.cookieKey] // for example: 'my_secret_sessionKey'
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// body-parser
//app.use(express.json());
// Error Handler Middleware
app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(422).send({ code: err.code, error: err.errmsg });
  }
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

// connnect to mongodb
mongoose.connect(mongodb.dbURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  authSource: "admin"
},
  (error, db) => {
    console.log('connected to mongodb...');
    if (error) console.log(error);
  }
);
mongoose.Promise = global.Promise;

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('app now listening for request on port ' + port);
});