/* eslint-disable jest/expect-expect */
// no need for that as we are using the supertest request expect to assert.

const request = require('supertest');
const { server, app } = require('../../server');
const UserModel = require('../../src/models/user-model');
const { ROUTES } = require('../../src/constants.js');
const { MOCK_USER_DATA_ROUTES1, MOCK_USER_DATA_ROUTES2, MOCK_USER_DATA_ROUTES3 } = require('../../src/constants');

jest.setTimeout(5000);

describe('APIs', () => {
  beforeEach(() => {
    const { name } = MOCK_USER_DATA_ROUTES1;

    return UserModel.findOne({ name })
      .then(
        () => UserModel.deleteMany({ name }),
      )
      .catch(() => true);
  });
  it('App is online', async () => {
    await request(app)
      .get(ROUTES.HEALTH)
      .expect(200);
  });
  it('Signup must get name - negative', async () => {
    await request(app)
      .post(ROUTES.SIGNUP)
      .send({ password: '0000000' })
      .expect(400);
  });
  it('Login route working', async () => {
    // false;
    const result = await request(app)
      .post(ROUTES.LOGIN)
      .set('ip', '5.5.5.5.5')
      .set('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36')
      .send(MOCK_USER_DATA_ROUTES2)
      .expect(200);
    await request(app)
      .post(ROUTES.AUTHENTICATE)
      .set('client_token', result.body.token)
      .expect(200);
  });
  it('list route working', async () => {
    const result = await request(app)
      .post(ROUTES.LOGIN)
      .set('ip', '5.5.5.5.5')
      .set('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36')
      .send(MOCK_USER_DATA_ROUTES3)
      .expect(200);
    await request(app)
      .post(ROUTES.ACTIVE_LIST)
      .set('client_token', result.body.token)
      .expect(200);
  });
  afterAll(() => {
    server.close();
  });
  afterAll(() => {
    server.close();
  });
});
