'use strict';

const mocks = require('./recommendations-helpers_test.mocks');
const expect = require('chai').expect;

describe('Helper functions for getGameRecommendations', () => {
  describe('getTagPlaytime', () => {
    it('returns an array', () => { });

    it('returns an array of objects', () => { })

    it('returns an array of tags that contain a name property and the time spent (number) as its value', () => { });

    it('returns an array of updated tags when given a set of tags as a parameter', () => { });
  });

  describe('getGenrePlaytime', () => {
    it('returns an array', () => { });

    it('returns an array of objects', () => { })

    it('returns an array of genres that contain a name property and the time spent (number) as its value', () => { });

    it('returns an array of updated genres when given a set of genres as a parameter', () => { });
  });

  describe('rateGame', () => {
    it('returns an object', () => { });

    it('returns an object with a rating and rating_reason property that is a number, and a string respectively', () => { });
  });

  describe('extractTagAndGenreTimes', () => {
    it('returns an array with six entries', () => { });

    it('returns the number of overlapping tags from the game with the given list of tags as the first entry', () => { });

    it('returns the number of overlapping genres from the game with the given list of genres as the second entry', () => { });

    it('returns the number of minutes spent on each tag from the given game as the third entry', () => { });

    it('returns the number of minutes spent on each genre from the given game as the fouth entry', () => { });

    it('returns the number of minutes spent on each tag from the given list of tags as the fifth entry', () => { });

    it('returns the number of minutes spent on each genre from the given list of genres as the sixth entry', () => { });
  });

  describe('scoreRatingAndReason', () => {
    it('returns an array with two entries', () => { });

    it('returns a rating (number) as the first entry', () => { });

    it('returns a rating_reason (string) as the second entry', () => { });
  });

  describe('findGameRating', () => {
    it('returns a number between 0 and 1', () => { });
  });

  describe('findGameRatingReason', () => {
    it('returns a string that describes a reason for a rating', () => { });

    it('returns a string that is determined by the maximum of the four inputs given', () => { });
  });
});