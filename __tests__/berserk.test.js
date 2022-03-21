const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('any-api routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create an Arc entry', async () => {
    const expected = {
      arc: 'Golden Age Arc',
      arcStart: 3,
      arcEnd: 14,
    };
    const res = await request(app).post('/api/v1/berserk').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
