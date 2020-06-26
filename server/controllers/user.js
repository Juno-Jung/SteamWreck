'use strict';

const { UserModel, GameModel } = require('../models/user');

const getAll = async (_, res) => {
  try {
    res.body = await UserModel.find({});
    res.status(200).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const deleteAll = async (req, res) => {
  try {
    res.body = await UserModel.deleteMany({});
    res.status(201).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = {
  getAll,
  deleteAll,
};
