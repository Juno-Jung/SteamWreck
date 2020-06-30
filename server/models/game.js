'use strict';

require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  steamid: Number,
  name: String,
  genres: [String],
  tags: [String],
  ratings: {
    type: {
      gamespot: Number,
      ign: Number,
      metacritic: Number,
    },
    required: false,
  }
});

const GameModel = mongoose.model('Games', gameSchema);

module.exports = GameModel;
