'use strict';

const GameModel = require('../models/game');

const getGameBySteamId = async (req, res) => {
  try {
    res.body = await GameModel.find({
      steamid: req.body.steamid,
    });
    res.status(200).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const getGamesBySteamId = async (req, res) => {
  try {
    const steamids = req.body.steamids;

    const games = await GameModel.find({ steamid: { $in: steamids } });

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
      steamid: req.body.steamid,
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
  getGameBySteamId,
  getGamesBySteamId,
  getAllGames,
  putGame,
  deleteGames
};
