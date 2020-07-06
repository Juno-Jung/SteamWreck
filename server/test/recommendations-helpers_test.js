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

    beforeEach(() => {
      this.result = extractTagAndGenreTimes(mocks.dbGame, mocks.tags, mocks.genres);
    });

    it('returns an array with six entries', () => {
      expect(extractTagAndGenreTimes(mocks.dbGame, mocks.tags, mocks.genres)).to.be.an('array');
    });

    it('returns the number of overlapping tags from the game with the given list of tags as the first entry', () => {
      let count = 0;
      for (let i = 0; i < mocks.dbGame.tags.length; i++) {
        if (mocks.tags.hasOwnProperty(mocks.dbGame.tags[i])) count++;
      }

      expect(this.result[0]).to.be.an('number');
      expect(this.result[0]).to.equal(count);
    });

    it('returns the number of overlapping genres from the game with the given list of genres as the second entry', () => {
      let count = 0;
      for (let i = 0; i < mocks.dbGame.genres.length; i++) {
        if (mocks.genres.hasOwnProperty(mocks.dbGame.genres[i])) count++;
      }

      expect(this.result[1]).to.be.an('number');
      expect(this.result[1]).to.equal(count);
    });

    it('returns the number of minutes spent on each tag from the given game as the third entry', () => {
      let minutes = 0;
      for (let i = 0; i < mocks.dbGame.tags.length; i++) {
        if (mocks.tags.hasOwnProperty(mocks.dbGame.tags[i])) minutes += mocks.tags[mocks.dbGame.tags[i]];
      }

      expect(this.result[2]).to.be.an('number');
      expect(this.result[2]).to.equal(minutes);
    });

    it('returns the number of minutes spent on each genre from the given game as the fouth entry', () => {
      let minutes = 0;
      for (let i = 0; i < mocks.dbGame.genres.length; i++) {
        if (mocks.genres.hasOwnProperty(mocks.dbGame.genres[i])) minutes += mocks.genres[mocks.dbGame.genres[i]];
      }

      expect(this.result[3]).to.be.an('number');
      expect(this.result[3]).to.equal(minutes);
    });

    it('returns the number of minutes spent on each tag from the given list of tags as the fifth entry', () => {
      let total = 0;
      let tagNames = Object.keys(mocks.tags);
      for (let i = 0; i < tagNames.length; i++) {
        if (mocks.tags.hasOwnProperty(tagNames[i])) total += mocks.tags[tagNames[i]];
      }

      expect(this.result[4]).to.be.an('number');
      expect(this.result[4]).to.equal(total);
    });

    it('returns the number of minutes spent on each genre from the given list of genres as the sixth entry', () => {
      let total = 0;
      let genreNames = Object.keys(mocks.genres);
      for (let i = 0; i < genreNames.length; i++) {
        if (mocks.genres.hasOwnProperty(genreNames[i])) total += mocks.genres[genreNames[i]];
      }

      expect(this.result[5]).to.be.an('number');
      expect(this.result[5]).to.equal(total);
    });
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