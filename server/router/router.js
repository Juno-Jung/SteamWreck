'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const { ensureAuthenticated } = require('./router-helpers');

const UserController = require('./../controllers/user');

router.get('/user/:steamid', UserController.getUserSummary); // Needs ensureAuthenticated
router.get('/recommendations/:steamid', UserController.getRecommendations); // Needs ensureAuthenticated
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/allusers', UserController.getUsers); // Also needs to be deleted once done testing.
router.delete('/users/delete', UserController.deleteAll); // This needs to be deleted at some point past testing.
router.put('/user/store/:steamid', UserController.putUserSummary); // This should have ensureAuthenticated

router.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    console.log(res.body);
    res.redirect('/');
  });
router.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  async function (req, res) {
    const user = await UserController.putUserSteam(req, res);
    res.redirect(`/user/${user.steamid}`);
  }
);

module.exports = router;
