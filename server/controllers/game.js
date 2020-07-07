'use strict';

const GameModel = require('../models/game');

const getGameByAppId = async (req, res) => {
  try {
    const game = await GameModel.find({
      appid: req.params.appid,
    });
    res.body = game[0];
    res.status(200).json(res.body);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const getGamesByAppId = async (req, res) => {
  try {
    const appids = req.body.appids;

    const games = await GameModel.find({ appid: { $in: appids } });

    res.body = games;
    res.status(200).json(res.body);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const getAllGames = async (_, res) => {
  try {
    res.body = await GameModel.find({});
    res.status(200).json(res.body);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const putGame = async (req, res) => {
  try {
    await GameModel.replaceOne({
      appid: req.body.appid,
    },
      req.body, {
      upsert: true,
    });
    res.status(200).json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const deleteGames = async (req, res) => {
  try {
    await GameModel.deleteMany({});
    res.status(200).json('Games deleted');
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

const deleteGame = async (req, res) => {
  try {
    await GameModel.deleteOne({
      appid: req.params.appid
    });
    res.status(200).json(`${req.params.appid} deleted`);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

module.exports = {
  getGameByAppId,
  getGamesByAppId,
  getAllGames,
  putGame,
  deleteGames,
  deleteGame
};
