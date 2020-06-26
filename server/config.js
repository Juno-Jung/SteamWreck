'use strict';

require('dotenv').config();

module.exports = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  DB_CONFIG: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
};
