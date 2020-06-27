'use strict';
// See if fetch works like this. If it fails, npm install node-fetch and const fetch = require('node-fetch'); in this file.

const { STEAM_API_KEY, STEAM_GET_USER_SUMMARY_URL } = require('./../config');

const steamApi = {
  getUserSummary: async function (steamId) {
    return this.fetchRequest(`${STEAM_GET_USER_SUMMARY_URL}/?key=${STEAM_API_KEY}&steamids=${steamId}`)
  },

  fetchRequest: (path, options) => {
    return fetch(path, options)
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => (res.status !== 204 ? res.json() : res))
      .catch(
        (err) =>
          console.log(`Error fetching [${options ? options.method : `GET`}]`, err) // eslint-disable-line
      );
  },
};

module.exports = steamApi;