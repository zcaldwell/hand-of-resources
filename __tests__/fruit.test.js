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
    const expected = { name: 'Peach', isStoneFruit: true };
    const res = await request(app).post('/api/v1/fruits').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('get all fruits', async () => {
    const expected = await Fruit.findAll();
    const res = await request(app).get('/api/v1/fruits');

    expect(res.body).toEqual(expected);
  });

  it('get fruit by id', async () => {
    const fruit = {
      id: expect.any(String),
      name: 'Apple',
      isStoneFruit: false,
    };
    const expected = await Fruit.insert(fruit);
    const res = await request(app).get(`/api/v1/fruits/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('updates a fruit', async () => {
    const initial = {
      name: 'Pear',
      isStoneFruit: true,
    };
    const expected = await Fruit.insert(initial);
    const res = await request(app)
      .patch(`/api/v1/fruits/${expected.id}`)
      .send({ isStoneFruit: false });

    expect(res.body).toEqual({ ...expected, isStoneFruit: false });
  });
});
