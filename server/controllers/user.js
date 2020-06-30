'use strict';

const UserModel = require('../models/user');
const steamApi = require('../services/steam-api');
const { processUserData, processUserLibraryData } = require('./user-helpers');

const getUsers = async (req, res) => {
  try {
    res.body = await UserModel.find({});
    res.status(200).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const getUserSummary = async (req, res) => {
  try {
    res.body = await UserModel.find({
      steamid: req.params.steamid,
    });
    res.status(200).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const getRecommendations = async (req, res) => {
  try {
    const steamId = req.params.steamid;

    const user = await UserModel.find({
      steamid: steamId,
    });


    const recommendations = {
      total: await steamApi.getRecommendations(user[0], 'total'),
      recent: await steamApi.getRecommendations(user[0], 'recent'),
    };

    // Returns updated document with new recommendations
    res.body = await UserModel.findOneAndUpdate({
      steamid: steamId
    }, {
      recommendations,
    }, {
      new: true,
      upsert: true,
    });

    res.status(200).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// This function does not send - it only returns the user object.
const putUserSteam = async (req, _) => {
  try {
    const steamId = req.user.id;
    const userSummaryData = await steamApi.getUserSummary(steamId);
    const user = processUserData(userSummaryData.response.players[0]);
    const userLibraryData = await steamApi.getUserLibrary(steamId);
    const userGames = processUserLibraryData(userLibraryData.response);

    user.owned = userGames;

    await UserModel.replaceOne({
      steamid: steamId,
    },
      user, {
      upsert: true,
    });

    return steamId;
  } catch (error) {
    console.log(error);
  }
};

// This function does not send - it only returns the user object.
const putUserSummary = async (req, res) => {
  try {
    const steamId = req.body.steamid;
    const userSummaryData = await steamApi.getUserSummary(steamId);
    const user = processUserData(userSummaryData.response.players[0]);
    const userLibraryData = await steamApi.getUserLibrary(steamId);
    const userGames = processUserLibraryData(userLibraryData.response);

    user.owned = userGames;

    await UserModel.replaceOne({
      steamid: steamId,
    },
      user, {
      upsert: true,
    });

    res.body = user;
    res.status(200).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const deleteAll = async (req, res) => {
  try {
    await UserModel.deleteMany({});
    res.body = 'Deleted';
    res.status(200).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = {
  getUsers,
  getUserSummary,
  getRecommendations,
  putUserSummary,
  putUserSteam,
  deleteAll,
};
