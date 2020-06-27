'use strict';

require('dotenv').config();

module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  STEAM_API_KEY: process.env.STEAM_API_KEY,
  DB_URI: process.env.DB_URI,
  DB_CONFIG: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
};
