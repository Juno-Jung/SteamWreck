const {
  processUserData,
  processUserLibraryData,
} = require('../helpers/user-helpers');

const mocks = require('./user-helpers_test.mocks');
const expect = require('chai').expect;

describe('Controller functions for the User Model', () => {
  describe('processUserData', () => {
    it('throws an error when given no data', () => {
      expect(() => {
        processUserData()
      }).to.throw();
    });

    it('returns an object given appropriate data', () => {
      const user = processUserData(mocks.userData);
      expect(user).to.be.an('object');
    });

    it('returns an object with steam properties given appropriate data', () => {
      const user = processUserData(mocks.userData);

      for (let i = 0; i < mocks.properties.length; i++) {
        expect(user).to.have.property(mocks.properties[i]);
      }
    });

    it('returns an object whose properties only contain strings', () => {
      const user = processUserData(mocks.userData);

      const keys = Object.keys(user);

      for (let i = 0; i < keys.length; i++) {
        expect(user[keys[i]]).to.be.a('string');
      }
    });

    it('returns an object whose avatar properties are URLs', () => {
      const user = processUserData(mocks.userData);

      expect(user.avatar).to.have.string(mocks.AVATAR_URL);
      expect(user.avatarmedium).to.have.string(mocks.AVATAR_URL);
      expect(user.avatarfull).to.have.string(mocks.AVATAR_URL);
    });
  });

  describe('processUserLibraryData', () => {
    it('throws an error when given empty data', () => {
      expect(() => {
        processUserLibraryData();
      }).to.throw();
    });

    it('returns an object given appropriate data', () => {
      const library = processUserLibraryData(mocks.library);

      expect(library).to.be.an('object');
    });

    it('returns an object with the expected schema given appropriate data', () => {
      const library = processUserLibraryData(mocks.library);

      expect(library).to.have.property('game_count');
      expect(library).to.have.property('game_ids');
      expect(library).to.have.property('games_owned');
      expect(library).to.have.property('games_unplayed');
    });

    it('returns an object whose properties contain types according to UserSchema, given appropriate data', () => {
      const library = processUserLibraryData(mocks.library);

      expect(library.game_count).to.be.a('number');
      expect(library.game_ids).to.be.an('array');
      expect(library.games_owned).to.be.an('array');
      expect(library.games_unplayed).to.be.an('array');
    });

    it('returns an object where game_ids is a property that contains an array of numbers', () => {
      const library = processUserLibraryData(mocks.library);

      for (let i = 0; i < library.game_ids.length; i++) {
        expect(library.game_ids[i]).to.be.a('number');
      }
    });

    it('returns an object whose games_owned and games_unplayed properties contain an object at each index, given appropriate data', () => {
      const library = processUserLibraryData(mocks.library);
      const games_owned = library.games_owned;
      const games_unplayed = library.games_unplayed;
      for (let i = 0; i < games_owned.length; i++) {
        expect(games_owned[i]).to.be.an('object');
      }
      for (let i = 0; i < games_unplayed.length; i++) {
        expect(games_unplayed[i]).to.be.an('object');
      }
    });

    it('returns an object whose games_owned and games_unplayed properties contain games with id, name, and playtimes of user at each index, given appropriate data', () => {
      const library = processUserLibraryData(mocks.library);
      const games_owned = library.games_owned;
      const games_unplayed = library.games_unplayed;
      for (let i = 0; i < games_owned.length; i++) {
        expect(games_owned[i]).to.have.property('appid');
        expect(games_owned[i]).to.have.property('name');
        expect(games_owned[i]).to.have.property('playtime_forever');
        expect(games_owned[i]).to.have.property('playtime_2weeks');
      }
      for (let i = 0; i < games_unplayed.length; i++) {
        expect(games_unplayed[i]).to.have.property('appid');
        expect(games_unplayed[i]).to.have.property('name');
        expect(games_unplayed[i]).to.have.property('playtime_forever');
        expect(games_unplayed[i]).to.have.property('playtime_2weeks');
      }
    });

    it('returns an object whose games_owned and games_unplayed properties contains games with id, name and playtimes of user that are of the correct type at each index, given appropriate data', () => {
      const library = processUserLibraryData(mocks.library);
      const games_owned = library.games_owned;
      const games_unplayed = library.games_unplayed;
      for (let i = 0; i < games_owned.length; i++) {
        expect(games_owned[i].appid).to.be.a('number');
        expect(games_owned[i].name).to.be.a('string');
        expect(games_owned[i].playtime_forever).to.be.a('number');
        if (games_owned[i].playtime_2weeks) {
          expect(games_owned[i].playtime_2weeks).to.be.a('number')
        } else {
          expect(games_owned[i].playtime_2weeks).to.be.undefined;
        }
      }
      for (let i = 0; i < games_unplayed.length; i++) {
        expect(games_unplayed[i].appid).to.be.a('number');
        expect(games_unplayed[i].name).to.be.a('string');
        expect(games_unplayed[i].playtime_forever).to.be.a('number');
        if (games_unplayed[i].playtime_2weeks) {
          expect(games_unplayed[i].playtime_2weeks).to.be.a('number')
        } else {
          expect(games_unplayed[i].playtime_2weeks).to.be.undefined;
        }
      }
    });
  });
});