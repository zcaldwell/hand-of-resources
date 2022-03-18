const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it.only('updates a  fruit', async () => {
    const expected = { name: 'Peach', isStoneFruit: '1' };
    const res = await request(app).post('/api/v1/fruits').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
