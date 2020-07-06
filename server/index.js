'use strict';

const express = require('express');
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
const session = require('express-session')
const morgan = require('morgan');
const cors = require('cors');

const app = new express();

const router = require('./router/router');
const { HOST, PORT, STEAM_API_KEY } = require('./config');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
  returnURL: 'http://localhost:3001/auth/steam/return',
  realm: 'http://localhost:3001/',
  apiKey: STEAM_API_KEY,
},
  function (identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      // console.log('Identifier: ', profile);
      profile.identifier = identifier;
      return done(null, profile);
    });
  }));

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log(`SteamWreck (v0.125) listening on http://${HOST}:${PORT}`);
});

module.exports = {
  app,
  passport,
};
