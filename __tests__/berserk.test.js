const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Berserk = require('../lib/models/Berserk');

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

  it('get all arcs', async () => {
    const expected = await Berserk.findAll();
    const res = await request(app).get('/api/v1/berserk');

    expect(res.body).toEqual(expected);
  });

  it('get arc by id', async () => {
    const arc = {
      id: expect.any(String),
      arc: 'Conviction Arc',
      arcStart: 14,
      arcEnd: 21,
    };
    const expected = await Berserk.insert(arc);
    const res = await request(app).get(`/api/v1/berserk/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
