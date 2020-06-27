'use strict';

const express = require('express');
const passport = require('passport');
const util = require('util');
const SteamStrategy = require('passport-steam').Strategy;
const session = require('express-session')
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router/router');
const { HOST, PORT } = require('./config');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new SteamStrategy({
  returnURL: 'http://localhost:3001/auth/steam/return',
  realm: 'http://localhost:3001/',
  apiKey: '98E0003388C5877F71AEA02EBBB7D190'
},
function(identifier, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's Steam profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the Steam account with a user record in your database,
    // and return that user instead.
    profile.identifier = identifier;
    return done(null, profile);
  });
}
));


const app = new express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session({
  secret: 'your secret',
  name: 'name of session id',
  resave: true,
  saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/', function(req, res){
  res.render('index', { user: req.user });
});
app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
app.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });
app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });



app.use(router);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`App listening on http://${HOST}:${PORT}`);
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}


module.exports = app;
