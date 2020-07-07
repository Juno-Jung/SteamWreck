'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const { ensureAuthenticated } = require('../helpers/router-helpers');

const UserController = require('./../controllers/user');
const GameController = require('./../controllers/game');

router.get('/user/:steamid', UserController.getUserSummary); // Needs ensureAuthenticated - stores user in database if it doesn't exist already.
router.put('/user/favourites/:steamid', UserController.putUserFavourites); // Needs ensureAuthenticated
router.get('/recommendations/:steamid', UserController.getRecommendations); // Needs ensureAuthenticated
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/games/all', GameController.getAllGames);
router.get('/game/:appid', GameController.getGameByAppId);
router.get('/games', GameController.getGamesByAppId);
router.delete('/games/delete', GameController.deleteGames); // This needs to be deleted past testing
router.delete('/game/delete/:appid', GameController.deleteGame); // This needs to be deleted past testing
router.get('/allusers', UserController.getUsers); // Also needs to be deleted once done testing.
router.delete('/users/delete', UserController.deleteAll); // This needs to be deleted at some point past testing.
router.delete('/user/delete/:steamid', UserController.deleteUser); // This needs to be deleted at some point past testing.
router.put('/user/store/:steamid', UserController.putUserSummary); // This should have ensureAuthenticated/for testing

router.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (_, res) {
    res.redirect('/');
  });
router.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  async function (req, res) {
    res.redirect(`http://localhost:3000/#steamid=${req.user.id}`);
  }
);

module.exports = router;
