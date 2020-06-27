'use strict';

require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  steamid: Number,
  recommendations: [Number], // Appid
  favourites: [Number], // Appid
  owned: {
    game_count: Number,
    games_owned: [Number], // Appid
    games_unplayed: [Number], // Appid
  },
});

const gameSchema = new Schema({
  appid: Number,
  genres: [String],
  tags: [String],
  ratings: {
    gamespot: Number,
    ign: Number,
    metacritic: Number,
  },
});

const UserModel = mongoose.model('Users', userSchema);
const GameModel = mongoose.model('Games', gameSchema);

module.exports = {
  UserModel,
  GameModel,
};
