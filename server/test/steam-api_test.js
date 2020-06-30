'use strict';

const steamApi = require('./../services/steam-api');
const mocks = require('./steam-api_test.mocks');
const expect = require('chai').expect;

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
      expect(user).to.have.property('loccountrycode');
      expect(user).to.have.property('locstatecode');
      expect(user).to.have.property('loccityid');
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

  });
});

describe('getRecommendations', () => {

});