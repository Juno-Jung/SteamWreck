'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router/router');
const { HOST, PORT } = require('./config');

const app = new express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`App listening on http://${HOST}:${PORT}`);
});

module.exports = app;
