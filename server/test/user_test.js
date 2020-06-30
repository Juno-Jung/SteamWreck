const UserModel = require('../models/user');

const expect = require('chai').expect;

describe('Creating documents', () => {
  it.only('creates a user', async (done) => {
    try {
      const user = await UserModel.findOne({
        steamid: 123,
        personaname: "",
        avatar: "String",
        avatarmedium: "String",
        avatarfull: "String",
        countrycode: "String",
        recommendations: {
          total: [{}],
          recent: [{}],
        },
        favourites: [13], // Appid
        owned: {
          game_count: 13,
          games_owned: [{
            appid: 13,
            name: "String",
            playtime_forever: 13,
            playtime_2weeks: 13,
          }],
          games_unplayed: [{
            appid: 13,
            name: "String",
            playtime_forever: 13,
            playtime_2weeks: 13,
          }],
        },
      });
    } catch (error) {

    }
    expect(user).to.be.a('object');
    expect(user).to.have.property('owned');
    expect(user.recommendations).to.equal({});
  })

});