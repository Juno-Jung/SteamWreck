'use strict';

require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  steam_id: Number,
  owned: {
    game_count: Number,
    games: Array,
  },
});

const gameSchema = new Schema({
  game_id: Number,
  tags: Array,
});

const UserModel = mongoose.model('Users', userSchema);
const GameModel = mongoose.model('Games', gameSchema);

module.exports = {
  UserModel,
  GameModel,
};
