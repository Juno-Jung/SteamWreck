'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const UserController = require('./../controllers/user');

router.get('/', function (req, res) {
  res.status(200).json('Hi Postman');
});
router.get('/account', ensureAuthenticated, function (req, res) {
  res.status(201).json('Hi Postman2');
});
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});
router.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    console.log(res.body);
    res.redirect('/');
  });
router.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    console.log(req.body);
    res.redirect('/');
  });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}



// At some point, we're going to have to make routes for authorization, and a route for processing data after receiving the Steam ID from the redirected route from authorization.

// router.get('/auth', Authorization);
// router.get('/authcallback', Authorization);
// router.get('/dashboard/:steamid', UserController);
// router.get('/recommendation/:steamid', UserController);

module.exports = router;
