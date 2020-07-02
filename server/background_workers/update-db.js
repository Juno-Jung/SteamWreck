'use strict';

const UserModel = require('../models/user');
const GameModel = require('./../models/game');

const { saveGame } = require('./../helpers/steam-api-helpers');

const updateGames = async () => {
  const users = await UserModel.find({});
  const userGames = [];

  // Extract all games from users and store them in userGames as a set (without repeated games)
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    for (let j = 0; j < user.owned.games_owned.length; j++) {
      const userGame = user.owned.games_owned[j];
      if (!userGames.some((game) => game === userGame)) {
        userGames.push(userGame);
      }
    }
  }

  const dbGames = await GameModel.find({});
  const gameIds = dbGames.map((dbGame) => {
    return dbGame.appid;
  });

  const gamesMissing = userGames.filter((userGame) => {
    return gameIds.includes(userGame.appid);
  });

  for (let i = 0; i < gamesMissing.length; i++) {
    saveGame(appid, name);
  }
}



module.exports = {
  updateGames,
};