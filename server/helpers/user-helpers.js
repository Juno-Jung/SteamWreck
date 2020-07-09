'use strict';

const steamApi = require('../services/steam-api');
const UserModel = require('../models/user');

const { getTagsAndGenres, rateGames } = require('./recommendations-helpers');

const getGameRecommendations = async (user, max = 3, friends, friendsLibrary, ratingType = 'similarity') => {
  try {
    // Sort games by total playtime from increasing to decreasing
    const userGamesTotal = user.owned.games_owned.slice().sort((a, b) => {
      return b.playtime_forever - a.playtime_forever;
    });

    // Sort games by recent playtime from increasing to decreasing
    const userGamesRecent = user.owned.games_owned.filter((game) => game.playtime_2weeks)
      .sort((a, b) => {
        return b.playtime_2weeks - a.playtime_2weeks;
      });

    // Sort games by recent playtime from increasing to decreasing
    const userGamesWorst = user.owned.games_owned.filter((game) => {
      return ((10 < game.playtime_forever) && (game.playtime_forever < 60));
    })
      .sort((a, b) => {
        return a.playtime_forever - b.playtime_forever;
      });

    const accuracy = 3;

    // Gets all tags and genres of top three games as objects. topTagsAndGenres returns an array with two entries, first is an object of tag/playtime pairs, second is an object of genre/playtime pairs.
    const [totalTags, totalGenres] = await getTagsAndGenres(userGamesTotal.slice(0, accuracy), user.owned.game_ids, 'total');
    const [recentTags, recentGenres] = await getTagsAndGenres(userGamesRecent.slice(0, accuracy), user.owned.game_ids, 'recent');
    const [worstTags, worstGenres] = await getTagsAndGenres(userGamesWorst.slice(0, accuracy), user.owned.game_ids, 'worst');

    // Rates unplayed games by recommendation algorithm. Returns array of unplayed games in the order of the highest rating to lowest rating. (Rating is not added to objects);
    console.log('\n', 'Recommendation Type: Total');
    console.log(`Top ${accuracy} Games for Total: `, userGamesTotal.slice(0, max));
    const totalRated = await rateGames(user.owned.games_unplayed, totalTags, totalGenres, user.owned.game_unplayed_ids, friends, friendsLibrary, ratingType);
    console.log('\n', 'Recommendation Type: Recent');
    console.log(`Top ${accuracy} Games for Recent: `, userGamesRecent.slice(0, max));
    const recentRated = await rateGames(user.owned.games_unplayed, recentTags, recentGenres, user.owned.game_unplayed_ids, friends, friendsLibrary, ratingType);
    console.log('\n', 'Recommendation Type: Worst');
    console.log(`Top ${accuracy} Games for Worst: `, userGamesWorst.slice(0, max));
    const worstRated = await rateGames(user.owned.games_unplayed, worstTags, worstGenres, user.owned.game_unplayed_ids, friends, friendsLibrary, ratingType);

    // Returns top three recommendations for each type.
    return [totalRated.slice(0, max), recentRated.slice(0, max), worstRated.slice(0, max)]
  } catch (error) {
    console.error(error);
  }
};

const createUserProfile = async (steamId) => {
  try {
    const userSummaryData = await steamApi.getUserSummary(steamId);
    const user = processUserData(userSummaryData.response.players[0]);
    const userLibraryData = await steamApi.getUserLibrary(steamId);
    const userGames = processUserLibraryData(userLibraryData.response);
    const userFriendsData = await steamApi.getUserFriends(steamId);
    let userFriends;
    if (userFriendsData) {
      userFriends = processUserFriendsData(userFriendsData.friendslist.friends);
    } else {
      userFriends = [];
    }

    user.friends = userFriends;
    user.owned = userGames;

    await UserModel.replaceOne({
      steamid: steamId,
    },
      user, {
      upsert: true,
    });

    return [user];
  } catch (error) {
    console.error(error);
  }
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
  // Make sure that libraryData is not empty (or if the profile is private). If it is, it returns an empty library
  if (!(Object.keys(libraryData).length === 0) && !(libraryData.game_count === 0)) {
    const library = {
      game_count: libraryData.game_count
    }

    // Adds all games owned to library object. Also adds all unplayed games that are owned to library object.
    const games = libraryData.games;
    const gamesOwned = [];
    const gamesUnplayed = [];
    const appIds = [];
    const gameUnplayedIds = [];
    for (let i = 0; i < games.length; i++) {
      appIds.push(games[i].appid);
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
    library.game_ids = appIds;
    library.game_unplayed_ids = gameUnplayedIds;
    library.games_owned = gamesOwned;
    library.games_unplayed = gamesUnplayed;

    return library;
  } else {
    // Empty library
    return {
      game_count: 0,
      game_ids: [],
      game_unplayed_ids: [],
      games_owned: [],
      games_unplayed: [],
    };
  }
};

const processUserFriendsData = (friendsData) => {
  return friendsData.map((friend) => {
    return friend.steamid;
  });
};

const getUserProfile = async (steamId) => {
  let user = await UserModel.find({
    steamid: steamId,
  });

  if (!user.length) {
    user = await createUserProfile(steamId);
  }

  return user[0];
};

module.exports = {
  getGameRecommendations,
  createUserProfile,
  processUserData,
  processUserLibraryData,
  processUserFriendsData,
  getUserProfile
}