'use strict';

// This file is meant to be temporarily store how one might get user recommendations

const getUserRecommendations = async (req, res) => {
  try {
    const user = await UserModel.find({
      steamid: req.body.steamid,
    });
    const steamId = user.steamid;
    const userGamesData = await steamApi.getUserLibrary(steamId);

    await postGamesIntoDB(userGamesData);

    const recommendations = await updateUserRecommendations(user, userGamesData);

    res.body = recommendations;
    res.status(200).json(res.body);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
