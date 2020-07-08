'use strict';

const UserModel = require('../models/user');
const { getGameRecommendations, getUserProfile } = require('../helpers/user-helpers');

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

    const user = await getUserProfile(steamId);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const putUserFavourites = async (req, res) => {
  try {
    const steamId = req.params.steamid;

    const user = await UserModel.findOneAndUpdate({
      steamid: steamId
    },
      {
        $set: {
          favourites: req.body.favourites,
        }
      }, {
      new: true,
    });

    if (!user) {
      throw new Error('User cannot be found');
    }

    res.status(200).json(user);
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

    // Friends is an array of user friends by steam id.
    const friends = user[0].friends;
    // FriendsProfile is an array of user friends by user object (indexed in the same order as friends).
    const friendsProfiles = await Promise.all(friends.map((friendId) => {
      return getUserProfile(friendId);
    }));
    // FriendsLibrary is an array, containing an array of game_ids that belong to a friend, indexed in the same order as Friends.
    const friendsLibrary = friendsProfiles.map((friend) => {
      return friend.owned.game_ids;
    });

    const [totalRec, recentRec, worstRec] = await getGameRecommendations(user[0], max, friends, friendsLibrary, 'similarity');

    const recommendations = {
      total: totalRec,
      recent: recentRec,
      worst: worstRec,
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
    const steamId = req.params.steamid;

    const user = await getUserProfile(steamId);

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

const deleteUser = async (req, res) => {
  try {
    await UserModel.deleteMany({
      steamid: req.params.steamid,
    });
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
  putUserFavourites,
  getRecommendations,
  putUserSummary,
  deleteAll,
  deleteUser,
};
