'use strict';

const rawgApi = require('../services/rawg-api');
const GameModel = require('../models/game');
const { TAG_WEIGHT, GENRE_WEIGHT, METACRITIC_WEIGHT } = require('../config');

// Takes an array of games and returns an array whose first index is a set of tags, and the second index is a set of genres.
const getTagsAndGenres = async (games, appIds, type) => {
  const tags = {};
  const genres = {};
  // Query DB for games by user game_ids array.
  const dbGames = await GameModel.find({ appid: { $in: appIds } });

  for (let i = 0; i < games.length; i++) {
    // Search dbGames for games[i].appid
    const game = dbGames.filter((dbGame) => dbGame.appid === games[i].appid)[0];

    // If the game is in dbGames, then save each tag as a property in tags and combine the playtime of each game that tag shows up in. Do the same for genres. Otherwise, call the rawg API.
    if (game) {
      // Refactor these for loops here, and in rawg API call.
      for (let j = 0; j < game.tags.length; j++) {
        if (tags.hasOwnProperty(game.tags[j])) {
          if (type === 'total') {
            tags[game.tags[j]] += games[i].playtime_forever
          } else if (type === 'recent') {
            tags[game.tags[j]] += games[i].playtime_2weeks
          }
        } else {
          tags[game.tags[j]] = type === 'total' ? games[i].playtime_forever : games[i].playtime_2weeks;
        }
      }
      for (let j = 0; j < game.genres.length; j++) {
        if (genres.hasOwnProperty(game.genres[j])) {
          if (type === 'total') {
            genres[game.genres[j]] += games[i].playtime_forever
          } else if (type === 'recent') {
            genres[game.genres[j]] += games[i].playtime_2weeks
          }
        } else {
          genres[game.genres[j]] = type === 'total' ? games[i].playtime_forever : games[i].playtime_2weeks;
        }
      }
    } else {
      try {
        const appId = games[i].appid;
        // Saves a game object into our db if details can be found from Rawg API call since it did not already exist in our db.
        const dbGame = await saveGame(appId, games[i].name);
        if (dbGame.rawg) {
          for (let j = 0; j < dbGame.tags.length; j++) {
            if (tags.hasOwnProperty(game.tags[j])) {
              if (type === 'total') {
                tags[game.tags[j]] += games.playtime_forever
              } else if (type === 'recent') {
                tags[game.tags[j]] += games.playtime_2weeks
              }
            } else {
              tags[game.tags[j]] = type === 'total' ? games.playtime_forever : games.playtime_2weeks;
            }
          }
          for (let j = 0; j < dbGame.genres.length; j++) {
            if (genres.hasOwnProperty(game.genres[j])) {
              if (type === 'total') {
                genres[game.genres[j]] += games.playtime_forever
              } else if (type === 'recent') {
                genres[game.genres[j]] += games.playtime_2weeks
              }
            } else {
              genres[game.genres[j]] = type === 'total' ? games.playtime_forever : games.playtime_2weeks;
            }
          }
        }
      } catch (error) {
        // console.error(error); // All errors are usually 404 Not Found errors.
      }
    }
  }
  return [tags, genres];
};

const rateGames = async (games, tags, genres, appIds) => {
  const ratedGames = [];

  // Query DB for games by user game_ids array.
  const dbGames = await GameModel.find({ appid: { $in: appIds } });

  for (let i = 0; i < games.length; i++) {

    // Search dbGames for games[i].appid
    const game = dbGames.filter((dbGame) => dbGame.appid === games[i].appid)[0];

    // If the game is in dbGames, then apply the rating algorithm to the game and push it to ratedGames.
    if (game && game.rawg) {
      const ratedGame = rateGame(game, tags, genres);
      ratedGames.push(ratedGame);
    } else if (!game) {
      try {
        const appId = games[i].appid;

        // Saves a game object into our db if details can be found from Rawg API call since it did not already exist in our db.
        const dbGame = await saveGame(appId, games[i].name);

        if (dbGame.rawg) {
          const ratedGame = rateGame(dbGame, tags, genres);

          ratedGames.push(ratedGame);
        }
      } catch (error) {
        // console.error(error); // All errors are usually 404 Not Found errors.
      }
    }
  };
  ratedGames.sort((a, b) => {
    return b.rating - a.rating;
  });
  return ratedGames;
};

const rateGame = (game, tags, genres) => {
  let overlappingTags = 0;
  let overlappingGenres = 0;
  let totalTags = 0;
  let totalGenres = 0;

  // Compare game tags to given list of tags and adds up the playtime associated to each tag. Same for genre.
  for (let j = 0; j < game.tags.length; j++) {
    if (tags[game.tags[j]]) {
      overlappingTags += tags[game.tags[j]];
    }
  }
  for (let j = 0; j < game.genres.length; j++) {
    if (genres[game.genres[j]]) {
      overlappingGenres += genres[game.genres[j]];
    }
  }

  // Find the total time of all game tags and genres.
  let tagNames = Object.keys(tags);
  for (let i = 0; i < tagNames.length; i++) {
    totalTags += tags[tagNames[i]];
  }

  let genreNames = Object.keys(genres);
  for (let i = 0; i < genreNames.length; i++) {
    totalGenres += tags[genreNames[i]];
  }

  // Scores based on similar tags and genres to the given set of games, and the game's metacritic score.
  const tag_score = overlappingTags / totalTags ? overlappingTags / totalTags : 0;
  const genre_score = overlappingGenres / totalGenres ? overlappingGenres / totalGenres : 0;
  const metacritic_score = game.ratings.metacritic / 100;

  let rating;
  // If the metacritic score is null/0, exclude it from the score.
  if (metacritic_score) {
    rating = tag_score * parseFloat(TAG_WEIGHT) + genre_score * parseFloat(GENRE_WEIGHT) + metacritic_score * parseFloat(METACRITIC_WEIGHT);
  } else {
    rating = (tag_score * parseFloat(TAG_WEIGHT) + genre_score * parseFloat(GENRE_WEIGHT)) / (parseFloat(TAG_WEIGHT) + parseFloat(GENRE_WEIGHT));
  }

  console.log('\n', `   Game: ${game.name} - Tag Score: ${tag_score}, Genre Score: ${genre_score}, Metacritic: ${metacritic_score}, Rating: ${rating}`);
  console.log(`    Tag Weight: ${TAG_WEIGHT}, Genre Weight: ${GENRE_WEIGHT}, Metacritic Weight: ${METACRITIC_WEIGHT}`);
  let rating_reason;
  // Sets rating reason based on which category scored the highest.
  if ((tag_score >= genre_score) && (tag_score >= metacritic_score)) {
    rating_reason = 'This game has similar tags to games that you have already played before.';
  } else if ((metacritic_score >= tag_score) && (metacritic_score >= genre_score)) {
    rating_reason = 'The metacritic score for this game is high among similar games that you have enjoyed.';
  } else if ((genre_score >= tag_score) && (genre_score >= metacritic_score)) {
    rating_reason = 'The genre of this game is similar to other genres you have played in the past.';
  }

  const ratedGame = {
    appid: game.appid,
    name: game.name,
    description: game.description,
    background_image: game.background_image,
    rating,
    rating_reason,
    tags: game.tags,
    genres: game.genres,
  };

  return ratedGame;
};

const saveGame = async (appId, name) => {
  const gameStub = name.replace(/\s+/g, '-').replace(/:/g, '').replace(/!/g, '').toLowerCase();
  const game = await rawgApi.getGameDetails(gameStub)

  let dbGame = {};
  if (game && game.tags && game.genres) {
    const gameTags = [];
    const gameGenres = [];
    const gameMetacritic = game.metacritic

    // Extracting Tag names from game.tags object into gameTags array.
    if (game.tags) {
      for (let j = 0; j < game.tags.length; j++) {
        gameTags.push(game.tags[j].name);
      }
    }
    if (game.genres) {
      for (let j = 0; j < game.genres.length; j++) {
        gameGenres.push(game.genres[j].name);
      }
    }

    // Save game properties
    dbGame.appid = appId;
    dbGame.rawg = true;
    dbGame.name = game.name;
    dbGame.background_image = game.background_image;
    dbGame.description = game.description;
    dbGame.genres = gameGenres;
    dbGame.tags = gameTags;
    dbGame.ratings = {
      metacritic: gameMetacritic,
    };

  } else {
    // Flag that the game has no rawg information.
    dbGame.appid = appId;
    dbGame.rawg = false;
  }

  await GameModel.replaceOne({
    appid: appId,
  },
    dbGame, {
    upsert: true,
  });

  return dbGame;
}

module.exports = {
  getTagsAndGenres,
  rateGames,
  saveGame,
};
