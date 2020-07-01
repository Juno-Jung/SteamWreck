'use strict';

require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  steamid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
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
