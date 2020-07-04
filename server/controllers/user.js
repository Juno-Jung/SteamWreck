'use strict';

const UserModel = require('../models/user');
const { createUserProfile, getGameRecommendations } = require('../helpers/user-helpers');

const getUsers = async (req, res) => {
  try {
    res.body = await UserModel.find({});
    res.status(200).json(res.body);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const getUserSummary = async (req, res) => {
  try {
    const steamId = req.params.steamid;
    let user = await UserModel.find({
      steamid: steamId,
    });

    if (!user.length) {
      user = await createUserProfile(steamId);
    }

    res.status(200).json(user[0]);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const getRecommendations = async (req, res) => {
  try {
    const steamId = req.params.steamid;
    const max = req.query.max // Need to change the router when frontend knows how many recommendations they want total/initially.
    const user = await UserModel.find({
      steamid: steamId,
    });

    const recommendations = {
      total: await getGameRecommendations(user[0], 'total', max),
      recent: await getGameRecommendations(user[0], 'recent', max),
    };

    // Returns updated document with new recommendations
    res.body = await UserModel.findOneAndUpdate({
      steamid: steamId
    }, {
      recommendations,
    }, {
      new: true
    });

    res.status(200).json(res.body);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

// This function does not send - it only returns the user object.
const putUserSummary = async (req, res) => {
  try {
    const steamId = req.body.steamid;

    const user = await createUserProfile(steamId);

    res.body = user;
    res.status(200).json(res.body);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const deleteAll = async (req, res) => {
  try {
    await UserModel.deleteMany({});
    res.body = 'Deleted';
    res.status(200).json(res.body);
  } catch (error) {
    console.error(error);
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
