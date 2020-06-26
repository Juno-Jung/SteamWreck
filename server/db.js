'use strict';

const mongoose = require('mongoose');
const { DB_URI, DB_CONFIG } = require('./config');

mongoose.connect(DB_URI, DB_CONFIG);
const db = mongoose.connection;

db.once('open', () => {
  console.log('MongoDB Atlas connection established!');
});

db.on('error', () => {
  console.error('MongoDB Atlas connection error!');
});

module.exports = db;
