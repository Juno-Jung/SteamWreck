'use strict';

require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  steamid: Number,
  recommendations: Array,
  favourites: Array,
  owned: {
    game_count: Number,
    games_owned: Array,
    games_unplayed: Array,
  },
});

const gameSchema = new Schema({
  appid: Number,
  genres: Array,
  tags: Array,
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
