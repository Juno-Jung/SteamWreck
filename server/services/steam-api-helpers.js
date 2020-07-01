'use strict';

const rawgApi = require('./rawg-api');
const GameModel = require('./../models/game');
const { TAG_WEIGHT, GENRE_WEIGHT, METACRITIC_WEIGHT } = require('./../config');

// Takes an array of games and returns an array whose first index is a set of tags, and the second index is a set of genres.
const getTagsAndGenres = async (games, steamIds) => {
  const tags = [];
  const genres = [];

  // Query DB for games by user game_ids/steamIds array.
  const dbGames = await GameModel.find({ steamid: { $in: steamIds } });

  for (let i = 0; i < games.length; i++) {
    // Search dbGames for games[i].appid
    const game = dbGames.filter((dbGame) => dbGame.steamid === games[i].appid)[0];

    // If the game is in dbGames, then push all the tags and genres of the game into the tags and genres array. Otherwise, call the rawg API
    if (game) {
      for (let j = 0; j < game.tags.length; j++) {
        if (!tags.includes(game.tags[j])) {
          tags.push(game.tags[j]);
        }
      }
      for (let j = 0; j < game.genres.length; j++) {
        if (!genres.includes(game.genres[j])) {
          genres.push(game.genres[j]);
        }
      }
    } else {
      try {
        const steamId = games[i].appid;
        const rawgGame = await rawgApi.getGameDetails(games[i].name.replace(/\s+/g, '-').replace(/:/g, '').toLowerCase());

        if (rawgGame) {
          await saveGame(steamId, game);

          for (let j = 0; j < game.tags.length; j++) {
            if (!tags.includes(game.tags[j].name)) {
              tags.push(game.tags[j].name);
            }
          }
          for (let j = 0; j < game.genres.length; j++) {
            if (!genres.includes(game.genres[j].name)) {
              genres.push(game.genres[j].name);
            }
          }
        } else {
          // Put the game in the database and flag that it has no rawg information.
          const dbGame = {
            steamid: steamId,
            rawg: false,
          };
          const test = await GameModel.replaceOne({
            steamid: steamId,
          },
            dbGame, {
            upsert: true,
          });
        }
      } catch (error) {
        // console.log(error); // All errors are usually 404 Not Found errors.
      }
    }
  }
  return [tags, genres];
};

const rateGame = (game, tags, genres) => {
  // Compare game tags to given list of tags.
  let overlappingTags = 0;
  let overlappingGenres = 0;

  // console.log('Genres: ', genres);
  // console.log('Game: ', game);
  for (let j = 0; j < game.tags.length; j++) {
    if (tags.includes(game.tags[j])) {
      overlappingTags++;
    }
  }
  for (let j = 0; j < game.genres.length; j++) {
    if (genres.includes(game.genres[j])) {
      overlappingGenres++;
    }
  }

  // Scores based on similar tags and genres to the given set of games, and the game's metacritic score.
  const tag_score = overlappingTags / game.tags.length ? overlappingTags / game.tags.length : 0;
  const genre_score = overlappingGenres / game.genres.length ? overlappingGenres / game.genres.length : 0;
  const metacritic_score = game.ratings.metacritic / 100;

  let rating;
  // If the metacritic score is null/0, exclude it from the score.
  if (metacritic_score) {
    rating = tag_score * parseFloat(TAG_WEIGHT) + genre_score * parseFloat(GENRE_WEIGHT) + metacritic_score * parseFloat(METACRITIC_WEIGHT);
  } else {
    rating = (tag_score * parseFloat(TAG_WEIGHT) + genre_score * parseFloat(GENRE_WEIGHT)) / (parseFloat(TAG_WEIGHT) + parseFloat(GENRE_WEIGHT));
  }

  console.log(`Game: ${game.name} - Tag Score: ${tag_score}, Genre Score: ${genre_score}, Metacritic: ${metacritic_score}, Rating: ${rating}`);

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
    steamid: game.steamid,
    name: game.name,
    description: game.description,
    background_image: game.background_image,
    rating,
    rating_reason,
  };

  return ratedGame;
};

const rateGames = async (games, tags, genres, steamIds) => {
  const ratedGames = [];

  // Query DB for games by user game_ids/steamIds array.
  const dbGames = await GameModel.find({ steamid: { $in: steamIds } });

  for (let i = 0; i < games.length; i++) {

    // Search dbGames for games[i].appid
    const game = dbGames.filter((dbGame) => dbGame.steamid === games[i].appid)[0];

    // If the game is in dbGames, then apply the rating algorithm to the game and push it to ratedGames.
    if (game && game.rawg) {
      const ratedGame = rateGame(game, tags, genres);
      ratedGames.push(ratedGame);
    } else if (!game) {
      try {
        const steamId = games[i].appid;
        const rawgGame = await rawgApi.getGameDetails(games[i].name.replace(/\s+/g, '-').replace(/:/g, '').toLowerCase());
        // Saves a game object into our db if details can be found from Rawg API call since it did not already exist in our db.
        if (rawgGame) {
          const dbGame = await saveGame(steamId, rawgGame);

          const ratedGame = rateGame(dbGame, tags, genres);

          ratedGames.push(ratedGame);
        } else {
          // Put the game in the database and flag that it has no rawg information.
          const dbGame = {
            steamid: steamId,
            rawg: false,
          };
          const test = await GameModel.replaceOne({
            steamid: steamId,
          },
            dbGame, {
            upsert: true,
          });
        }
      } catch (error) {
        // console.log(error); // All errors are usually 404 Not Found errors.
      }
    }
  };
  ratedGames.sort((a, b) => {
    return b.rating - a.rating;
  });
  return ratedGames;
};

const saveGame = async (steamId, game) => {
  const gameTags = [];
  const gameGenres = [];
  const gameMetacritic = game.metacritic

  // Extracting Tag names from game.tags object into gameTags array.
  for (let j = 0; j < game.tags.length; j++) {
    gameTags.push(game.tags[j].name);
  }
  for (let j = 0; j < game.genres.length; j++) {
    gameGenres.push(game.genres[j].name);
  }

  // Put the game in the database
  const dbGame = {
    steamid: steamId,
    rawg: true,
    name: game.name,
    background_image: game.background_image,
    description: game.description,
    genres: gameGenres,
    tags: gameTags,
    ratings: {
      metacritic: gameMetacritic,
    },
  };

  await GameModel.replaceOne({
    steamid: steamId,
  },
    dbGame, {
    upsert: true,
  });

  return dbGame;
}

module.exports = {
  getTagsAndGenres,
  rateGames,
};
