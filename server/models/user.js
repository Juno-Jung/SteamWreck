'use strict';

require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  steamid: Number,
  personaname: String,
  avatar: String,
  avatarmedium: String,
  avatarfull: String,
  countrycode: String,
  recommendations: {
    total: [Object],
    recent: [Object],
  },
  favourites: [Number], // Appid
  owned: {
    game_count: Number,
    games_owned: [{
      appid: Number,
      name: String,
      playtime_forever: Number,
      playtime_2weeks: Number,
    }],
    games_unplayed: [{
      appid: Number,
      name: String,
      playtime_forever: Number,
      playtime_2weeks: Number,
    }],
  },
});

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;