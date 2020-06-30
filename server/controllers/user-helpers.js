'use strict';

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
  for (let i = 0; i < games.length; i++) {
    gamesOwned.push({
      appid: games[i].appid,
      name: games[i].name,
      playtime_forever: games[i].playtime_forever,
      playtime_2weeks: games[i].playtime_2weeks,
    });
    gameIds.push(games[i].appid);
    if (!games[i].playtime_forever > 0) {
      gamesUnplayed.push({
        appid: games[i].appid,
        name: games[i].name,
        playtime_forever: games[i].playtime_forever,
        playtime_2weeks: games[i].playtime_2weeks,
      });
    }
  }
  library.game_ids = gameIds;
  library.games_owned = gamesOwned;
  library.games_unplayed = gamesUnplayed;

  return library;
};

module.exports = {
  processUserData,
  processUserLibraryData,
}