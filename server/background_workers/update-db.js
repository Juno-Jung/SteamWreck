'use strict';

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, './../.env') });

const UserModel = require('../models/user');
const GameModel = require('./../models/game');

const { saveGame } = require('./../helpers/steam-api-helpers');

// Uncomment the line before and run this file to update games immediately.
// updateGames();

const updateGames = async () => {
  try {
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

    // Find all games in db and return an array of appids (game id from Steam).
    const dbGames = await GameModel.find({});
    const gameIds = dbGames.map((dbGame) => {
      return dbGame.appid;
    });

    // From user games, find the games that are not in the db.
    const gamesMissing = userGames.filter((userGame) => {
      return !gameIds.includes(userGame.appid);
    });

    // Save all games that are not in the database already.
    for (let i = 0; i < gamesMissing.length; i++) {
      const game = gamesMissing[i];
      await saveGame(game.appid, game.name);
    }

    console.log('DB Updater: All games updated!');
    process.exit(-1);
  } catch (error) {
    console.error(`Error: Problems saving games to database.`);
  }
}

module.exports = {
  updateGames,
};