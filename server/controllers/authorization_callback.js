'use strict';

// This file is meant to be temporarily store how the authorization callback should function until the actual authentication process is stored.

const authCallback = async (req, res) => {

  // This assumes authentication is validated.

  const steamId = req.body.steamId; // Not exactly sure where the steamId is coming after authentiation.
  const userSummaryData = await steamApi.getUserSummary(steamId);
  const userData = processUserData(userSummaryData);

  await postUserIntoDB(userData);

  res.body = userData;
  res.status(200).json(res.body);
};

module.exports = authCallback;