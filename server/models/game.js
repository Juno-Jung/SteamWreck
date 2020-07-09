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
  steam: {
    type: Boolean,
    required: true,
  },
  name: String,
  description: String,
  description_steam: String,
  description_short: String,
  description_about: String,
  screenshots: [{
    id: Number,
    path_thumbnail: String,
    path_full: String,
  }],
  background_image: String,
  genres: [String],
  tags: [String],
  ratings: {
    type: {
      gamespot: {
        type: {
          rating: Number,
          url: String,
        },
        required: false,
      },
      ign: {
        type: {
          rating: Number,
          url: String,
        },
        required: false,
      },
      metacritic: {
        type: {
          rating: Number,
          url: String,
        },
        required: false,
      },
    },
    required: false,
  },
});

const GameModel = mongoose.model('Games', gameSchema);

module.exports = GameModel;
