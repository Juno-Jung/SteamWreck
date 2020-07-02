'use strict';

const steamApi = require('./../services/steam-api');
const mocks = require('./steam-api_test.mocks');
const expect = require('chai').expect;

describe('Steam API functions used by the server', () => {
  describe('getUserSummary', () => {
    it('returns a resolved promise containing a response object with a player array that is empty given an invalid steamid', async () => {
      const res = await steamApi.getUserSummary();

      expect(res.response.players).to.be.an('array').that.is.empty;
    });

    it('returns a resolved promise containing a response object with an array with profile data of a single user given a valid steamid', async () => {
      try {
        const res = await steamApi.getUserSummary(mocks.steamid);
        const user = res.response.players[0];

        expect(user).to.have.property('steamid');
        expect(user).to.have.property('personaname');
        expect(user).to.have.property('avatar');
        expect(user).to.have.property('avatarmedium');
        expect(user).to.have.property('avatarfull');
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getUserLibrary', () => {
    before(async () => {
      this.res = await steamApi.getUserLibrary(mocks.steamid);
      this.library = this.res.response;
    });

    it('returns an unresolved promise that is undefined given an invalid steamid', async () => {
      try {
        const res = await steamApi.getUserLibrary();

        expect(res).to.be.undefined;
      } catch (error) {
        console.log(error);
      };
    });

    it("returns a resolved promise containing a response object with properties on a user's game library", () => {
      expect(this.library).to.have.property('game_count');
      expect(this.library).to.have.property('games');
    });

    it('returns a library of games with the number of games, and an array', () => {
      expect(this.library.game_count).to.be.a('number');
      expect(this.library.games).to.be.an('array');
    });

    it('returns a library of games that has an array with objects representing games', () => {
      for (let i = 0; i < this.library.games.length; i++) {
        expect(this.library.games[i]).to.have.property('appid');
        expect(this.library.games[i]).to.have.property('name');
        expect(this.library.games[i]).to.have.property('playtime_forever');

        expect(this.library.games[i].appid).to.be.a('number');
        expect(this.library.games[i].name).to.be.a('string');
        expect(this.library.games[i].playtime_forever).to.be.a('number');

        if (this.library.games[i].playtime_2weeks) {
          expect(this.library.games[i]).to.have.property('playtime_2weeks');
          expect(this.library.games[i].playtime_2weeks).to.be.a('number');
        } else {
          expect(this.library.games[i].playtime_2weeks).to.be.undefined;
        }
      }
    });
  });

  describe('getRecommendations', () => {

    before(async () => {
      this.total = await steamApi.getRecommendations(mocks.user, 'total');
      this.recent = await steamApi.getRecommendations(mocks.user, 'recent');
    });

    it('returns an unresolved promise that is undefined given an invalid user', async () => {
      const res = await steamApi.getRecommendations(undefined, 'total');

      expect(res).to.be.undefined;
    });

    it('returns an array with at most three unsorted games given an invalid recommendation type', async () => {
      const res = await steamApi.getRecommendations(mocks.user, '');
      expect(res).to.be.an('array');
      expect(res.length).to.be.below(4);
    });

    it("returns an array with the top three (or fewer) rated games based on total playtime out of user's unplayed games", () => {
      expect(this.total[0].rating).to.be.above(this.total[1].rating);
      expect(this.total[1].rating).to.be.above(this.total[2].rating);
      for (let i = 0; i < this.total.length; i++) {
        expect(this.total[i].name).to.be.a('string');
        expect(this.total[i].rating_reason).to.be.a('string');
      }
    });

    it("returns an array with the top three (or fewer) rated games based on recent playtime out of user's unplayed games", () => {
      expect(this.recent[0].rating).to.be.above(this.recent[1].rating);
      expect(this.recent[1].rating).to.be.above(this.recent[2].rating);
      for (let i = 0; i < this.recent.length; i++) {
        expect(this.recent[i].name).to.be.a('string');
        expect(this.recent[i].rating_reason).to.be.a('string');
      }
    });
  });
});