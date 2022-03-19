const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Birthday = require('../lib/models/Birthday');

describe('any-api routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a birthday entry', async () => {
    const expected = {
      name: 'Tom',
      date: '11/11/2011',
      id: expect.any(String),
    };
    const res = await request(app).post('/api/v1/birthdays').send(expected);

    expect(res.body).toEqual(expected);
  });

  it('get all birthdays', async () => {
    const expected = await Birthday.findAll();
    const res = await request(app).get('/api/v1/birthdays');

    expect(res.body).toEqual(expected);
  });

  it('get birthday by ID', async () => {
    const birthday = { name: 'Jon', date: '12/12/2012' };
    const expected = await Birthday.insert(birthday);
    const res = await request(app).get(`/api/v1/birthdays/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
