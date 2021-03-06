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

  it('update a birthday', async () => {
    const initial = { name: 'Bobby', date: '01/01/2001' };
    const birthday = await Birthday.insert(initial);
    const res = await request(app)
      .patch(`/api/v1/birthdays/${birthday.id}`)
      .send({ date: '2/2/2002' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Bobby',
      date: '2/2/2002',
    });
  });

  it('deletes a birthday', async () => {
    const initial = { name: 'Hank', date: '3/3/2003' };
    const birthday = await Birthday.insert(initial);
    const res = await request(app).delete(`/api/v1/birthdays/${birthday.id}`);

    expect(res.body).toEqual(birthday);
  });
});
