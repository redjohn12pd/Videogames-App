/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Genre, conn } = require('../../src/db.js');

const agent = session(app);
const genre = {
  name: 'Action',
};

describe('Genre routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Genre.sync({ force: true })
    .then(() => Videogame.create(genre)));
  describe('GET /api/genres', () => {
    it('should get 200', () =>
      agent.get('/api/genres').expect(200)
    );
  });
});