/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario',
  description: 'soy un juego cool',
  launchDate: '10/06/2021',
  rating: 1.5,
  genres:["faaf5d8e-f877-4967-9d8c-5d91b8a09395"],
  platforms: ['cad098ed-a6f7-4c13-a6a0-37dcbdd4a10b'],
  backgroundImage: null
}
describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => {
      Videogame.create(videogame)
    }));
  describe('GET /api/videogames', () => {
    it('should get 200', () =>
      agent.get('/api/videogames').expect(200)
    );
    it('should get 200', () =>
      agent.get(`/api/videogames/${12}`).expect(200)
    );
  });

  describe('POST /api/videogames', () => {
    it('responds with 200', () => agent.post('/api/videogames').expect(200));
    it('responds with the videogame', () =>
      agent.post('/api/videogames')
        .send(videogame)
        .then((res) => {
          expect(res.body.result).toEqual();
        })
    );
  });
});

