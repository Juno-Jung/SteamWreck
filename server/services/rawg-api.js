'use strict';

const fetch = require('node-fetch');

const { RAWG_BASE_URL } = require('./../config');

const rawgApi = {
  // options: {
  //   'User-Agent': 'SteamWrecks',
  // },

  getGameDetails: function (gameSlug) {
    return this.fetchRequest(`${RAWG_BASE_URL}/games/${gameSlug}`);
  },

  fetchRequest: (path, options) => {
    return fetch(path, options)
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => (res.status !== 204 ? res.json() : res))
      .catch(
        (err) => {
          // console.log(`Error fetching [${options ? options.method : `GET`}]`, err) // eslint-disable-line
        }
      );
  },
};

module.exports = rawgApi;
