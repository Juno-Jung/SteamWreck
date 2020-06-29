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
  recommendations: [Number], // Appid
  favourites: [Number], // Appid
  owned: {
    game_count: Number,
    games_owned: [Object], // Appid
    games_unplayed: [Object], // Appid
  },
});

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;