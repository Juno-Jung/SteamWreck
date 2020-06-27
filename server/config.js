'use strict';

require('dotenv').config();

module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  STEAM_API_KEY: process.env.STEAM_API_KEY,
  STEAM_GET_USER_SUMMARY_URL: process.env.STEAM_GET_USER_SUMMARY_URL,
  STEAM_GET_USER_LIBRARY_URL: process.env.STEAM_GET_USER_LIBRARY_URL,
  DB_URI: process.env.DB_URI,
  DB_CONFIG: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
};
