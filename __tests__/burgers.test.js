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

  it('get Burger by ID', async () => {
    const initial = { name: 'Killer Burger', rating: 2 };
    const expected = await Burger.insert(initial);
    const res = await request(app).get(`/api/v1/burgers/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('updates a burger', async () => {
    const initial = { name: 'Hi the spoot', rating: 8 };
    const burger = await Burger.insert(initial);
    const res = await request(app)
      .patch(`/api/v1/burgers/${burger.id}`)
      .send({ name: 'Hit the Spot' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Hit the Spot',
      rating: 8,
    });
  });
});
