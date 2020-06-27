'use strict';

const UserModel = require('../models/user');
const { steamApi } = require('../services/steam-api');
const { processUserData } = require('./user-helpers');

const getUser = async (req, res) => {
  try {
    res.body = await UserModel.find({
      steamid: req.body.steamid,
    });
    res.status(200).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const getRecommendations = async (req, res) => {
  try {
    // Get recommendations
    res.status(200).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const putUser = async (req, res) => {
  try {
    console.log('Put User: ', req.body);

    const steamId = req.body.steamId; // Not exactly sure where the steamId is coming after authentiation.
    const userSummaryData = await steamApi.getUserSummary(steamId);
    const userData = processUserData(userSummaryData);

    await UserModel.replaceOne(userData);

    res.body = userData;
    res.status(200).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500)
  }
};

module.exports = {
  getUser,
  getRecommendations,
  putUser,
};
