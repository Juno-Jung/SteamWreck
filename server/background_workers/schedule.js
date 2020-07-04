'use strict';
const schedule = require('node-schedule');

const { updateGames } = require('./update-db');

// Schedule 'Update Games db' task to occur at 4 AM daily.
const rule = new schedule.RecurrenceRule();
rule.hour = 4;
rule.minute = 0;

schedule.scheduleJob(rule, () => {
  try {
    updateGames();
    console.log(`Updating database started at ${Date.now()}`);
  } catch (error) {
    console.error(`Error occured while updating database at ${Date.now()}`, error);
  }
});
