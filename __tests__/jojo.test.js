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

  it('get all jojos', async () => {
    const expected = await Jojo.findAll();
    const res = await request(app).get('/api/v1/jojos');

    expect(res.body).toEqual(expected);
  });

  it('get jojo by ID', async () => {
    const initial = { name: 'Jotarro Joestar', part: 'Stardust Crusaders ' };
    const expected = await Jojo.insert(initial);
    const res = await request(app).get(`/api/v1/jojos/${expected.id}`);

    expect(res.body).toEqual(expected);
  });

  it('updates a jojo', async () => {
    const initial = { name: 'Jolyne Joestar', part: 'Stone Ocean' };
    const jojo = await Jojo.insert(initial);
    const res = await request(app)
      .patch(`/api/v1/jojos/${jojo.id}`)
      .send({ name: 'Jolyne Cujoh' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Jolyne Cujoh',
      part: 'Stone Ocean',
    });
  });

  it('deletes a jojo', async () => {
    const initial = { name: 'Jolyne Cujoh', part: 'Stone Ocean' };
    const jojo = await Jojo.insert(initial);
    const res = await request(app).delete(`/api/v1/jojos/${jojo.id}`);

    expect(res.body).toEqual(jojo);
  });
});
