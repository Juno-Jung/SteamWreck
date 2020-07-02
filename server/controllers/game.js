'use strict';

const GameModel = require('../models/game');

const getGameByAppId = async (req, res) => {
  try {
    res.body = await GameModel.find({
      gameid: req.body.gameid,
    });
    res.status(200).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const getGamesByAppId = async (req, res) => {
  try {
    const gameids = req.body.gameids;

    const games = await GameModel.find({ gameid: { $in: gameids } });

    res.body = games;
    res.status(200).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const getAllGames = async (_, res) => {
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
    await GameModel.replaceOne({
      gameid: req.body.gameid,
    },
      req.body, {
      upsert: true,
    });
    res.status(200).json(req.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const deleteGames = async (req, res) => {
  try {
    await GameModel.deleteMany({});
    res.status(200).json('Games deleted');
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

module.exports = {
  getGameByAppId,
  getGamesByAppId,
  getAllGames,
  putGame,
  deleteGames
};
