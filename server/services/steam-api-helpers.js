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
        const game = await rawgApi.getGameDetails(games[i].name.replace(/\s+/g, '-').replace(/:/g, '').toLowerCase());

        const gameTags = game.tags;
        const gameGenres = game.genres;
        const gameMetacritic = game.metacritic

        // Put the game in the database
        const dbGame = {
          steamid: games[i].appid,
          name: games[i].name,
          genres: gameGenres,
          tags: gameTags,
          ratings: {
            metacritic: gameMetacritic,
          },
        };

        // await GameModel.create(dbGame);

        for (let j = 0; j < gameTags.length; j++) {
          if (!tags.includes(gameTags[j].name)) {
            tags.push(gameTags[j].name);
          }
        }
        for (let j = 0; j < gameGenres.length; j++) {
          if (!genres.includes(gameGenres[j].name)) {
            genres.push(gameGenres[j].name);
          }
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

  for (let j = 0; j < game.tags.length; j++) {
    if (tags.includes(game.tags[j].name)) {
      overlappingTags++;
    }
  }
  for (let j = 0; j < game.genres.length; j++) {
    if (genres.includes(game.genres[j].name)) {
      overlappingGenres++;
    }
  }

  // Scores based on similar tags and genres to the given set of games, and the game's metacritic score.
  const tag_score = overlappingTags / game.tags.length;
  const genre_score = overlappingGenres / game.genres.length;
  const metacritic_score = game.ratings.metacritic / 100;

  // if the metacritic score is null, then exclude it from the weight entirely and reweight.
  const rating = tag_score * TAG_WEIGHT + genre_score * GENRE_WEIGHT + metacritic_score * METACRITIC_WEIGHT;

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
    name: game.name,
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
    if (game) {
      console.log(game);
      const ratedGame = rateGame(game, tags, genres);
      ratedGames.push(ratedGame);
    } else {
      try {
        const game = await rawgApi.getGameDetails(games[i].name.replace(/\s+/g, '-').replace(/:/g, '').toLowerCase());

        const gameTags = game.tags;
        const gameGenres = game.genres;
        const gameMetacritic = game.metacritic

        // Put the game in the database
        const dbGame = {
          steamid: games[i].appid,
          name: games[i].name,
          genres: gameGenres,
          tags: gameTags,
          ratings: {
            metacritic: gameMetacritic,
          },
        };

        // await GameModel.create(dbGame);

        const ratedGame = rateGame(dbGame, tags, genres);

        ratedGames.push(ratedGame);
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

module.exports = {
  getTagsAndGenres,
  rateGames,
};
