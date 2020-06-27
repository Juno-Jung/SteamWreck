'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const { ensureAuthenticated } = require('./router-helpers');

const UserController = require('./../controllers/user');

router.get('/', function (req, res) {
  res.status(200).json('Hi Postman');
});
router.get('/account/:steamid', ensureAuthenticated, function (req, res) {
  res.status(201).json('Hi Postman2');
});
router.get('/recommendations/:steamid', ensureAuthenticated, UserController.getRecommendations);
router.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    console.log(res.body);
    res.redirect('/');
  });
router.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  async function (req, res) {
    console.log(req);
    await UserController.putUser(req, res)
  }
);
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
