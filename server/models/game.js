'use strict';

require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  // appid refers specifically to the appid in the Steam Store.
  appid: {
    type: Number,
    required: true,
  },
  rawg: {
    type: Boolean,
    required: true,
  },
  name: String,
  description: String,
  background_image: String,
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
