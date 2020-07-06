'use strict';
const fetch = require('node-fetch');

const { STEAM_API_KEY, STEAM_GET_USER_SUMMARY_URL, STEAM_GET_USER_LIBRARY_URL, STEAM_GET_GAME_DETAILS_URL, STEAM_GET_USER_FRIENDS_URL } = require('./../config');

const steamApi = {
  getUserSummary: function (steamId) {
    return this.fetchRequest(`${STEAM_GET_USER_SUMMARY_URL}/?key=${STEAM_API_KEY}&steamids=${steamId}`);
  },

  getUserLibrary: function (steamId) {
    return this.fetchRequest(`${STEAM_GET_USER_LIBRARY_URL}/?key=${STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=true`);
  },

  getUserFriends: function (steamId) {
    return this.fetchRequest(`${STEAM_GET_USER_FRIENDS_URL}/?key=${STEAM_API_KEY}&steamid=${steamId}&relationship=friend`);
  },

  getGameDetails: function (steamId) {
    return this.fetchRequest(`${STEAM_GET_GAME_DETAILS_URL}/appdetails?appids=${steamId}`);
  },

  fetchRequest: (path, options) => {
    return fetch(path, options)
      .then((res) => (res.ok ? res : Promise.reject(res)))
      .then((res) => (res.status !== 204 ? res.json() : res))
      .catch(
        (error) => {
          // console.error(`Error fetching [${options ? options.method : `GET`}]: ${error}`)
        }
      );
  },
};

module.exports = steamApi;
