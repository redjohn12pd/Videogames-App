/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Platform, conn } = require('../../src/db.js');

const agent = session(app);
const platform = {
  name: 'PC',
};

describe('Platform routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Platform.sync({ force: true })
    .then(() => Platform.create(platform)));
  describe('GET /api/platforms', () => {
    it('should get 200', () =>
      agent.get('/api/platforms').expect(200)
    );
  });
});