'use strict';

require('dotenv').config();

module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  BASE_METACRITIC_URL: process.env.BASE_METACRITIC_URL,
  STEAM_API_KEY: process.env.STEAM_API_KEY,
  STEAM_GET_USER_SUMMARY_URL: process.env.STEAM_GET_USER_SUMMARY_URL,
  STEAM_GET_USER_LIBRARY_URL: process.env.STEAM_GET_USER_LIBRARY_URL,
  STEAM_GET_USER_FRIENDS_URL: process.env.STEAM_GET_USER_FRIENDS_URL,
  STEAM_GET_GAME_DETAILS_URL: process.env.STEAM_GET_GAME_DETAILS_URL,
  RAWG_BASE_URL: process.env.RAWG_BASE_URL,
  TAG_WEIGHT: process.env.TAG_WEIGHT,
  GENRE_WEIGHT: process.env.GENRE_WEIGHT,
  METACRITIC_WEIGHT: process.env.METACRITIC_WEIGHT,
  FRIEND_WEIGHT: process.env.FRIEND_WEIGHT,
  DB_URI: process.env.DB_URI,
  DB_CONFIG: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
};
