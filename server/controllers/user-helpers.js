'use strict';

const steamApi = require('./../services/steam-api');
const UserModel = require('./../models/user');

const createUserProfile = async (steamId) => {
  const userSummaryData = await steamApi.getUserSummary(steamId);
  const user = processUserData(userSummaryData.response.players[0]);
  const userLibraryData = await steamApi.getUserLibrary(steamId);
  const userGames = processUserLibraryData(userLibraryData.response);

  user.owned = userGames;

  await UserModel.replaceOne({
    steamid: steamId,
  },
    user, {
    upsert: true,
  });

  return [user];
};

// Takes in Steam User Summary API Data for the first user returned from the call (ideally the only user) and returns an object that follows User Schema.
const processUserData = (userData) => {

  const user = {
    steamid: userData.steamid,
    personaname: userData.personaname,
    avatar: userData.avatar,
    avatarmedium: userData.avatarmedium,
    avatarfull: userData.avatarfull,
    countrycode: userData.loccountrycode,
  };

  return user;
};

// Takes in Steam User Owned Games API Data and returns an object that follows the 'owned' property in User Schema.

const processUserLibraryData = (libraryData) => {

  const library = {
    game_count: libraryData.game_count
  }

  // Adds all games owned to library object. Also adds all unplayed games that are owned to library object.
  const games = libraryData.games;
  const gamesOwned = [];
  const gamesUnplayed = [];
  const gameIds = [];
  const gameUnplayedIds = [];

  for (let i = 0; i < games.length; i++) {
    gameIds.push(games[i].appid);
    gamesOwned.push({
      appid: games[i].appid,
      name: games[i].name,
      playtime_forever: games[i].playtime_forever,
      playtime_2weeks: games[i].playtime_2weeks,
    });
    if (!games[i].playtime_forever > 0) {
      gameUnplayedIds.push(games[i].appid);
      gamesUnplayed.push({
        appid: games[i].appid,
        name: games[i].name,
        playtime_forever: games[i].playtime_forever,
        playtime_2weeks: games[i].playtime_2weeks,
      });
    }
  }
  library.game_ids = gameIds;
  library.game_unplayed_ids = gameUnplayedIds;
  library.games_owned = gamesOwned;
  library.games_unplayed = gamesUnplayed;

  return library;
};

module.exports = {
  createUserProfile,
  processUserData,
  processUserLibraryData,
}