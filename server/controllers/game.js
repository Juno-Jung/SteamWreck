'use strict';

const GameModel = require('../models/game');

const getGame = async (req, res) => {
  try {
    res.body = await GameModel.find({
      appid: req.appid,
    });
    res.status(200).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const getGames = async (req, res) => {
  try {
    res.body = await GameModel.find({});
    res.status(200).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const putGame = async (req, res) => {
  try {
    res.body = await GameModel.find({
      appid: req.appid,
    });
    res.status(200).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = {
  getGame,
  getGames,
  putGame,
};
