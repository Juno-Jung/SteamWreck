'use strict';

const rawgApi = require('../services/rawg-api');
const steamApi = require('../services/steam-api');
const GameModel = require('../models/game');
const { TAG_WEIGHT, GENRE_WEIGHT, METACRITIC_WEIGHT, FRIEND_WEIGHT, BASE_METACRITIC_URL } = require('../config');

// Takes an array of games and returns an array whose first index is a set of tags, and the second index is a set of genres.
const getTagsAndGenres = async (games, appIds, type) => {
  let tags = {};
  let genres = {};
  // Query DB for games by user game_ids array.
  const dbGames = await GameModel.find({ appid: { $in: appIds } });

  for (let i = 0; i < games.length; i++) {
    // Search dbGames for games[i].appid
    const game = dbGames.filter((dbGame) => dbGame.appid === games[i].appid)[0];

    /* If the game is in dbGames, then save each tag as a property in tags and combine the playtime 
    of each game that tag shows up in. Do the same for genres. Otherwise, call the rawg API. */
    if (game) {
      tags = getTagPlaytime(tags, game, games[i], type);
      genres = getGenrePlaytime(genres, game, games[i], type);
    } else {
      try {
        const appId = games[i].appid;
        // Saves a game object into our db if details can be found from Rawg API call since it did not already exist in our db.
        const dbGame = await saveGame(appId, games[i].name);
        if (dbGame.rawg && dbGame.steam) {
          tags = getTagPlaytime(tags, dbGame, games[i], type);
          genres = getGenrePlaytime(genres, dbGame, games[i], type);
        }
      } catch (error) {
        console.error(error); // All errors are usually 404 Not Found errors.
      }
    }
  }
  return [tags, genres];
};

const rateGames = async (games, tags, genres, appIds, friends, friendsLibrary, ratingType) => {
  const ratedGames = [];

  // Query DB for games by user game_ids array.
  const dbGames = await GameModel.find({ appid: { $in: appIds } });

  for (let i = 0; i < games.length; i++) {

    // Search dbGames for games[i].appid
    const game = dbGames.filter((dbGame) => dbGame.appid === games[i].appid)[0];

    // If the game is in dbGames, then apply the rating algorithm to the game and push it to ratedGames.
    if (game && game.rawg && game.steam) {
      const ratedGame = rateGame(game, tags, genres, ratingType, friends, friendsLibrary);
      ratedGames.push(ratedGame);
    } else if (!game) {
      try {
        const appId = games[i].appid;

        // Saves a game object into our db if details can be found from Rawg API call since it did not already exist in our db.
        const dbGame = await saveGame(appId, games[i].name);

        if (dbGame.rawg) {
          const ratedGame = rateGame(dbGame, tags, genres, ratingType, friends, friendsLibrary);

          ratedGames.push(ratedGame);
        }
      } catch (error) {
        console.error(error); // All errors are usually 404 Not Found errors.
      }
    }
  };
  ratedGames.sort((a, b) => {
    return b.rating - a.rating;
  });

  return ratedGames;
};

// Rating type switches between different rating styles. 
const rateGame = (game, tags, genres, ratingType, friends, friendsLibrary) => {
  if (!game.name) {
    throw new Error(`Error: ${game.appid} does not have the correct data.`);
  }

  // Determines if game contains a mulitplayer tag
  const tagLower = game.tags.map((tagName) => tagName.toLowerCase());
  const isMultiplayer = tagLower.reduce((acc, tag) => {
    return acc || tag === 'multiplayer' || tag === 'cooperative' || tag === 'online multiplayer' || tag === 'co-op';
  }, false);

  // Compare game tags to given list of tags and adds up the playtime associated to each tag and genre. Also find the total time of all game tags and genres.
  // tagsAndGenres = [overlappingTags, overlappingGenres, tagTime, genreTime, totalTagTime, totalGenreTime];
  const tagsAndGenres = extractTagAndGenreTimes(game, tags, genres);

  // Find an array of friends that also own the game.
  const friendsHaveGame = friendsLibrary
    .map((games) => {
      return games.includes(game.appid);
    })
    .reduce((friendsHaveGame, hasGame, index) => {
      if (hasGame) {
        friendsHaveGame.push(friends[index]);
      }
      return friendsHaveGame;
    }, []);

  const [rating, rating_reason] = scoreRatingAndReason(game, tagsAndGenres, friends, friendsHaveGame, isMultiplayer, ratingType);

  const ratedGame = {
    appid: game.appid,
    name: game.name,
    description: game.description,
    description_short: game.description_short,
    description_steam: game.description_steam,
    description_about: game.description_about,
    screenshots: game.screenshots,
    background_image: game.background_image,
    rating,
    rating_reason,
    metacritic_url: game.ratings.metacritic.url,
    tags: game.tags,
    genres: game.genres,
  };

  return ratedGame;
};

const extractTagAndGenreTimes = (game, tags, genres) => {
  let overlappingTags = 0;
  let overlappingGenres = 0;
  let tagTime = 0;
  let genreTime = 0;
  let totalTagTime = 0;
  let totalGenreTime = 0;

  for (let j = 0; j < game.tags.length; j++) {
    if (tags[game.tags[j]]) {
      tagTime += tags[game.tags[j]];
      overlappingTags++;
    }
  }
  for (let j = 0; j < game.genres.length; j++) {
    if (genres[game.genres[j]]) {
      genreTime += genres[game.genres[j]];
      overlappingGenres++;
    }
  }

  let tagNames = Object.keys(tags);
  for (let i = 0; i < tagNames.length; i++) {
    totalTagTime += tags[tagNames[i]];
  }

  let genreNames = Object.keys(genres);
  for (let i = 0; i < genreNames.length; i++) {
    totalGenreTime += genres[genreNames[i]];
  }

  return [overlappingTags, overlappingGenres, tagTime, genreTime, totalTagTime, totalGenreTime];
};

/* Returns the rating and rating_reason based on parameters that include tags, genres, metacritic score and how many friends have the game. 
   This is the main algorithm that recommends a game to the user. */
const scoreRatingAndReason = (game, tagsAndGenres, friends, friendsHaveGame, isMultiplayer, ratingType) => {
  let tag_score;
  let genre_score;
  let metacritic_score;
  let friend_score;

  const [overlappingTags, overlappingGenres, tagTime, genreTime, totalTagTime, totalGenreTime] = tagsAndGenres;

  // Scores based on similar tags and genres to the given set of games, and the game's metacritic score.
  if (ratingType === 'similarity') {
    tag_score = overlappingTags / game.tags.length ? overlappingTags / game.tags.length : 0;
    genre_score = overlappingGenres / game.genres.length ? overlappingGenres / game.genres.length : 0;
    metacritic_score = game.ratings.metacritic.rating / 100;
    friend_score = Math.min(3, friendsHaveGame.length) / 3; // 1 friend = 0.5 score, 2 friend = 0.6 score, 3 friends = 1 score. Use a function to output this eventually.

    // This rating style emphasizes the amount of time you spent on a particular tag or genre type, weighting more heavily played tags and genres higher.
  } else if (ratingType === 'timespent') {
    tag_score = tagTime / totalTagTime ? tagTime / totalTagTime : 0;
    genre_score = genreTime / totalGenreTime ? genreTime / totalGenreTime : 0;
    metacritic_score = game.ratings.metacritic.rating / 100;
    friend_score = Math.min(3, friendsHaveGame.length) / 3; // 1 friend = 0.5 score, 2 friend = 0.6 score, 3 friends = 1 score. Use a function to output this eventually.
  }

  const rating = findGameRating(tag_score, genre_score, metacritic_score, friend_score, friends, isMultiplayer);
  const rating_reason = findGameRatingReason(tag_score, genre_score, metacritic_score, friend_score);

  // Service logger to give information about the game
  console.log('\n', `   Steam Id: ${game.appid}, Game: ${game.name}`);
  console.log(`    Tag Score: ${tag_score}, Genre Score: ${genre_score}, Metacritic: ${metacritic_score}, Friend Score: ${friend_score}, Rating: ${rating}`);
  console.log(`    Tag Weight: ${TAG_WEIGHT}, Genre Weight: ${GENRE_WEIGHT}, Metacritic Weight: ${METACRITIC_WEIGHT}`);

  return [rating, rating_reason];
};

// Gives a rating which is the probability that the user will enjoy the game.
const findGameRating = (tag_score, genre_score, metacritic_score, friend_score, friends, isMultiplayer) => {
  let rating;
  // If the metacritic score is null/0, exclude it from the score. If the game isn't multiplayer (or the person has zero friends), exclude the friend score.
  if (metacritic_score && friends.length && isMultiplayer) {
    rating = tag_score * parseFloat(TAG_WEIGHT) + genre_score * parseFloat(GENRE_WEIGHT) + metacritic_score * parseFloat(METACRITIC_WEIGHT) + friend_score * parseFloat(FRIEND_WEIGHT);
  } else if (metacritic_score) {
    rating = (tag_score * parseFloat(TAG_WEIGHT) + genre_score * parseFloat(GENRE_WEIGHT) + metacritic_score * parseFloat(METACRITIC_WEIGHT)) / (parseFloat(TAG_WEIGHT) + parseFloat(GENRE_WEIGHT) + parseFloat(METACRITIC_WEIGHT));
  } else if (friends.length && isMultiplayer) {
    rating = (tag_score * parseFloat(TAG_WEIGHT) + genre_score * parseFloat(GENRE_WEIGHT) + friend_score * parseFloat(FRIEND_WEIGHT)) / (parseFloat(TAG_WEIGHT) + parseFloat(GENRE_WEIGHT) + parseFloat(FRIEND_WEIGHT));
  } else {
    rating = (tag_score * parseFloat(TAG_WEIGHT) + genre_score * parseFloat(GENRE_WEIGHT)) / (parseFloat(TAG_WEIGHT) + parseFloat(GENRE_WEIGHT));
  }
  return rating;
};

const findGameRatingReason = (tag_score, genre_score, metacritic_score, friend_score) => {
  let rating_reason;
  // Sets rating reason based on which category scored the highest.
  if ((tag_score >= genre_score) && (tag_score >= metacritic_score) && (tag_score >= friend_score)) {
    rating_reason = 'This game has similar tags to games that you have already played before.';
  } else if ((metacritic_score >= tag_score) && (metacritic_score >= genre_score) && (metacritic_score >= friend_score)) {
    rating_reason = 'The metacritic score for this game is high among similar games that you have enjoyed.';
  } else if ((genre_score >= tag_score) && (genre_score >= metacritic_score) && (genre_score >= friend_score)) {
    rating_reason = 'The genre of this game is similar to other genres you have played in the past.';
  } else if ((friend_score >= tag_score) && (friend_score >= metacritic_score) && (friend_score >= genre_score)) {
    rating_reason = 'This multiplayer game is owned by a friend, or several friends.';
  }
  return rating_reason;
};

const saveGame = async (appId, name) => {
  const gameStub = name.replace(/\s+/g, '-').replace(/:/g, '').replace(/!/g, '').toLowerCase();
  const game = await rawgApi.getGameDetails(gameStub)
  const steamRes = await steamApi.getGameDetails(appId);

  let steamGame;
  if (steamRes) {
    steamGame = steamRes[appId].success ? steamRes[appId].data : null;
  }

  let dbGame = {};
  if (game && game.tags && game.genres && steamGame && steamGame.detailed_description && steamGame.short_description && steamGame.about_the_game && steamGame.screenshots) {
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

    // Save game properties
    dbGame.appid = appId;
    dbGame.rawg = true;
    dbGame.steam = true;
    dbGame.name = game.name;
    dbGame.background_image = game.background_image;
    dbGame.description = game.description;
    dbGame.description_steam = steamGame.detailed_description;
    dbGame.description_short = steamGame.short_description;
    dbGame.description_about = steamGame.about_the_game;
    dbGame.screenshots = steamGame.screenshots;
    dbGame.genres = gameGenres;
    dbGame.tags = gameTags;
    dbGame.ratings = {
      metacritic: {
        rating: gameMetacritic,
        url: `${BASE_METACRITIC_URL}/game/pc/${gameStub}`,
      },
    };

  } else if (game && game.tags && game.genres) {
    // Flag that the game has no Steam information.
    dbGame.appid = appId;
    dbGame.rawg = true;
    dbGame.steam = false;
  } else if (steamGame && steamGame.detailed_description && steamGame.short_description && steamGame.about_the_game && steamGame.screenshots) {
    // Flag that the game has no rawg information.
    dbGame.appid = appId;
    dbGame.rawg = false;
    dbGame.steam = true;
  } else {
    // Flag games that have neither Steam nor rawg information.
    dbGame.appid = appId;
    dbGame.rawg = false;
    dbGame.steam = false;
  }

  await GameModel.replaceOne({
    appid: appId,
  },
    dbGame, {
    upsert: true,
  });

  return dbGame;
}

const getTagPlaytime = (oldTags, dbGame, userGame, type) => {
  const tags = Object.assign({}, oldTags);
  for (let i = 0; i < dbGame.tags.length; i++) {
    if (tags.hasOwnProperty(dbGame.tags[i])) {
      if (type === 'total' || type === 'worst') {
        tags[dbGame.tags[i]] += userGame.playtime_forever
      } else if (type === 'recent') {
        tags[dbGame.tags[i]] += userGame.playtime_2weeks
      }
    } else {
      tags[dbGame.tags[i]] = (type === 'total' || type === 'worst') ? userGame.playtime_forever : userGame.playtime_2weeks;
    }
  }
  return tags;
}

const getGenrePlaytime = (oldGenres, dbGame, userGame, type) => {
  const genres = Object.assign({}, oldGenres);
  for (let i = 0; i < dbGame.genres.length; i++) {
    if (genres.hasOwnProperty(dbGame.genres[i])) {
      if (type === 'total' || type === 'worst') {
        genres[dbGame.genres[i]] += userGame.playtime_forever
      } else if (type === 'recent') {
        genres[dbGame.genres[i]] += userGame.playtime_2weeks
      }
    } else {
      genres[dbGame.genres[i]] = (type === 'total' || type === 'worst') ? userGame.playtime_forever : userGame.playtime_2weeks;
    }
  }
  return genres;
}
module.exports = {
  getTagsAndGenres,
  getTagPlaytime,
  rateGames,
  rateGame,
  saveGame,
  extractTagAndGenreTimes,
  scoreRatingAndReason,
  getGenrePlaytime,
  findGameRating,
  findGameRatingReason,
};
