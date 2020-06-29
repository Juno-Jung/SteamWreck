'use strict';

const rawgApi = require('./rawg-api');
const { TAG_WEIGHT, GENRE_WEIGHT, METACRITIC_WEIGHT } = require('./../config');

// Takes an array of games and returns an array whose first index is a set of tags, and the second index is a set of genres.
const getTagsAndGenres = async (games) => {
  const tags = [];
  const genres = [];

  for (let i = 0; i < games.length; i++) {
    try {
      const game = await rawgApi.getGameDetails(games[i].name.replace(/\s+/g, '-').toLowerCase());

      const gameTags = game.tags;
      const gameGenres = game.genres;

      for (let j = 0; j < gameTags.length; j++) {
        if (!tags.includes[gameTags[j].name]) {
          tags.push(gameTags[j].name);
        }
      }
      for (let j = 0; j < gameGenres.length; j++) {
        if (!genres.includes[gameGenres[j].name]) {
          genres.push(gameGenres[j].name);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return [tags, genres];
};

const rateGames = async (games, tags, genres) => {
  const ratedGames = [];

  for (let i = 0; i < games.length; i++) {
    try {
      const game = await rawgApi.getGameDetails(games[i].name.replace(/\s+/g, '-').toLowerCase());

      const gameTags = game.tags;
      const gameGenres = game.genres;

      // Compare game tags to given list of tags.
      let overlappingTags = 0;
      let overlappingGenres = 0;
      for (let j = 0; j < gameTags.length; j++) {
        if (tags.includes(gameTags[j].name)) {
          overlappingTags++;
        }
      }
      for (let j = 0; j < gameGenres.length; j++) {
        if (genres.includes(gameGenres[j].name)) {
          overlappingGenres++;
        }
      }

      // Scores based on similar tags and genres to the given set of games, and the game's metacritic score.
      const tag_score = overlappingTags / gameTags.length;
      const genre_score = overlappingGenres / gameGenres.length;
      const metacritic_score = game.metacritic / 100;

      const rating = tag_score * TAG_WEIGHT + genre_score * GENRE_WEIGHT + metacritic_score * METACRITIC_WEIGHT;

      let rating_reason;
      // Sets rating reason based on which category scored the highest.
      if ((tag_score > genre_score) && (tag_score > metacritic_score)) {
        rating_reason = 'This game has similar tags to games that you have already played before.';
      } else if ((genre_score > tag_score) && (genre_score > metacritic_score)) {
        rating_reason = 'The genre of this game is similar to other genres you have played in the past.';
      } else if ((metacritic_score > tag_score) && (metacritic_score > genre_score)) {
        rating_reason = 'The metacritic score for this game is high among similar games that you have enjoyed.';
      }

      ratedGames.push({
        name: game.name,
        rating,
        rating_reason,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return ratedGames;
};

module.exports = {
  getTagsAndGenres,
  rateGames,
};
