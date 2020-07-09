'use strict';
const schedule = require('node-schedule');

const { updateGames } = require('./update-db');

// Schedule 'Update Games db' task to occur daily, every 6 min from 2 AM to 6 AM.
schedule.scheduleJob('*/6 2-6 * * *', () => {
  try {
    updateGames();
    console.log(`Updating database started at ${Date.now()}`);
  } catch (error) {
    console.error(`Error occured while updating database at ${Date.now()}`, error);
  }
});
