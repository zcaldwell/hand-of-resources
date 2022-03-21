const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Burger = require('../lib/models/Burger');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should add a new burger', async () => {
    const expected = {
      name: 'Mid City Smashburger',
      rating: 9,
    };
    const res = await request(app).post('/api/v1/burgers').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('get all burgers', async () => {
    const expected = await Burger.findAll();
    const res = await request(app).get('/api/v1/burgers');

    expect(res.body).toEqual(expected);
  });
});
