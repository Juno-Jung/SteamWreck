'use strict';

const UserModel = require('../models/user');

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

module.exports = {
  getUser,
};
