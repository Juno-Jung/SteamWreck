'use strict';

const fetch = require('node-fetch');

const { RAWG_BASE_URL } = require('./../config');

const rawgApi = {
  getGameDetails: function (gameSlug) {
    return this.fetchRequest(`${RAWG_BASE_URL}/games/${gameSlug}`);
  },

  fetchRequest: (path, options) => {
    return fetch(path, options)
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => (res.status !== 204 ? res.json() : res))
      .catch(
        (err) => {
          console.error(`Error fetching [${options ? options.method : `GET`}]: ${err}`)
        }
      );
  },
};

module.exports = rawgApi;
