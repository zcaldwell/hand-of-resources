const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Fruit = require('../lib/models/Fruit');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('updates a  fruit', async () => {
    const expected = { name: 'Peach', isStoneFruit: '1' };
    const res = await request(app).post('/api/v1/fruits').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it.only('get all fruits', async () => {
    const expected = await Fruit.findAll();
    const res = await request(app).get('/api/v1/fruits');

    expect(res.body).toEqual(expected);
  });
});
