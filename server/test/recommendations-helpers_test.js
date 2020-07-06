'use strict';

const mocks = require('./recommendations-helpers_test.mocks');
const expect = require('chai').expect;
const { getTagPlaytime, getGenrePlaytime, rateGame, extractTagAndGenreTimes, scoreRatingAndReason, findGameRating, findGameRatingReason } = require('./../helpers/recommendations-helpers');

describe('Helper functions for getGameRecommendations', () => {
  describe('getTagPlaytime', () => {
    it('returns an object', () => {
      expect(getTagPlaytime({}, mocks.dbGame, mocks.userGame, mocks.type)).to.be.an('object');
    });

    it('returns an object that contains a name property and the time spent (number) as its value', () => {
      const tags = mocks.dbGame.tags;
      const result = getTagPlaytime({}, mocks.dbGame, mocks.userGame, mocks.type);
      for (let i = 0; i < tags.length; i++) {
        expect(result).to.have.property(tags[i]);
        expect(result[tags[i]]).to.be.a('number');
      }
    });
    it('returns an object of updated tags when given a set of tags as a parameter', () => {
      const result = getTagPlaytime(mocks.oldTags, mocks.dbGame, mocks.userGame, mocks.type);

      if (mocks.dbGame.tags.includes('Singleplayer')) {
        expect(result['Singleplayer']).to.equal(mocks.oldTags['Singleplayer'] + mocks.userGame.playtime_forever);
      } else {
        expect(result['Singleplayer']).to.equal(mocks.oldTags['Singleplayer']);
      }
    });
  });

  describe('getGenrePlaytime', () => {
    it('returns an object', () => {
      expect(getGenrePlaytime({}, mocks.dbGame, mocks.userGame, mocks.type)).to.be.an('object');
    });

    it('returns an object that contains a name property and the time spent (number) as its value', () => {
      const genres = mocks.dbGame.genres;
      const result = getGenrePlaytime({}, mocks.dbGame, mocks.userGame, mocks.type);
      for (let i = 0; i < genres.length; i++) {
        expect(result).to.have.property(genres[i]);
        expect(result[genres[i]]).to.be.a('number');
      }
    });
    it('returns an object of updated genres when given a set of genres as a parameter', () => {
      const result = getGenrePlaytime(mocks.oldGenres, mocks.dbGame, mocks.userGame, mocks.type);

      if (mocks.dbGame.genres.includes('Action')) {
        expect(result['Action']).to.equal(mocks.oldGenres['Action'] + mocks.userGame.playtime_forever);
      } else {
        expect(result['Action']).to.equal(mocks.oldGenres['Action']);
      }
    });
  });

  describe('rateGame', () => {
    it('returns an object', () => {
      expect(rateGame(mocks.dbGame, mocks.tags, mocks.genres, mocks.ratingType, mocks.friends, mocks.friendsLibrary)).to.be.an('object');
    });

    it('returns an object with a rating and rating_reason property that is a number, and a string respectively', () => {
      const result = rateGame(mocks.dbGame, mocks.tags, mocks.genres, mocks.ratingType, mocks.friends, mocks.friendsLibrary);
      expect(result.rating).to.be.a('number');
      expect(result.rating_reason).to.be.a('string');
    });
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