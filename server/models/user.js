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
  recommendations: [Number], // Appid
  favourites: [Number], // Appid
  owned: {
    game_count: Number,
    games_owned: [Number], // Appid
    games_unplayed: [Number], // Appid
  },
});

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;