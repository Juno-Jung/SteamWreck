const UserModel = require('../models/user');

const expect = require('chai').expect;

describe('Creating documents', () => {
  after(async () => {
    await UserModel.deleteMany({
      steamid: 123,
    });
  });

  it('creates a user', async () => {
    try {
      const user = await UserModel.create({
        steamid: 123,
      });

      expect(user).to.be.a('object');
      expect(user).to.have.property('steamid');
    } catch (error) {
      console.log(error);
    }
  })

  it('fails to create a user with properties not defined by schema', async () => {
    try {
      const user = await UserModel.create({
        steamid: 123,
        appid: 123,
      });

      expect(user).to.not.have.property('appid');
    } catch (error) {
      console.log(error);
    }
  });
});