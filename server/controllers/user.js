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
      total: await steamApi.getTotalRecommendations(user[0]),
      recent: await steamApi.getRecentRecommendations(user[0]),
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

const putUserSummary = async (req, res) => {
  try {
    console.log('Put User: ', req.body);

    const steamId = req.body.steamid; // Not exactly sure where the steamId is coming after authentiation. Could make it into req.params.steamid
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
    res.status(500)
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
  deleteAll,
};
