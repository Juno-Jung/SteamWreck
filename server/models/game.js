'use strict';

require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const GameModel = mongoose.model('Games', gameSchema);

module.exports = GameModel;
