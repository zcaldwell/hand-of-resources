const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Jojo = require('../lib/models/Jojo');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should add a new Jojo', async () => {
    const expected = {
      name: 'Joseph Joestar',
      part: 'Battle Tendency',
    };
    const res = await request(app).post('/api/v1/jojos').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
