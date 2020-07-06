'use strict';
require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  steamid: {
    type: String,
    required: true,
  },
  personaname: String,
  friends: {
    type: [String],
    required: false,
  },
  avatar: String,
  avatarmedium: String,
  avatarfull: String,
  countrycode: String,
  recommendations: {
    total: {
      type: [{
        appid: Number,
        name: String,
        description: String,
        description_short: String,
        description_steam: String,
        description_about: String,
        screenshots: [{
          id: Number,
          path_thumbnail: String,
          path_full: String,
        }],
        background_image: String,
        rating: Number,
        rating_reason: String,
        tags: [String],
        genres: [String]
      }],
      required: false,
    },
    recent: {
      type: [{
        appid: Number,
        name: String,
        description: String,
        description_short: String,
        description_steam: String,
        description_about: String,
        screenshots: [{
          id: Number,
          path_thumbnail: String,
          path_full: String,
        }],
        background_image: String,
        rating: Number,
        rating_reason: String,
        tags: [String],
        genres: [String]
      }],
      required: false,
    },
    required: false,
  },
  favourites: {
    type: [Number], // Appid
    default: null,
    required: false,
  },
  owned: {
    type: {
      game_count: Number,
      game_ids: {
        type: [Number],
        required: true,
      },
      game_unplayed_ids: {
        type: [Number],
        required: true,
      },
      games_owned: [{
        appid: Number,
        name: String,
        playtime_forever: Number,
        playtime_2weeks: Number,
      }],
      games_unplayed: [{
        appid: Number,
        name: String,
      }],
    },
    required: false,
  },
});

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;