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
  avatar: String,
  avatarmedium: String,
  avatarfull: String,
  countrycode: String,
  recommendations: {
    type: {
      total: [Object],
      recent: [Object],
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