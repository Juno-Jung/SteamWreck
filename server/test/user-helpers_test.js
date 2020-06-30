const {
  processUserData,
  processUserLibraryData,
} = require('../controllers/user-helpers');

const mocks = require('./user-helpers_test.mocks');
const expect = require('chai').expect;

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
});