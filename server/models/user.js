'use strict';

require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  steam_id: String,
});

const UserModel = mongoose.model('Technology', userSchema);

module.exports = UserModel;
