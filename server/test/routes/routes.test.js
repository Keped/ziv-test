const request = require('supertest');
const { server, app } = require('../../server');
const UserModel = require('../../src/models/user-model');
const { ROUTES } = require('../../src/constants.js');
const { MOCK_USER_DATA_ROUTES1, MOCK_USER_DATA_ROUTES2, MOCK_USER_DATA_ROUTES3 } = require('../../src/constants');

jest.setTimeout(5000);

describe('APIs', () => {
  beforeEach(() => {
    const { name, password } = MOCK_USER_DATA_ROUTES1;

    return UserModel.findOne({ name })
      .then(
        (res) => UserModel.deleteMany({ name }),
      )
      .catch((err) => true);
  });
  test('App is online', async () => {
    await request(app)
      .get(ROUTES.HEALTH)
      .expect(200);
  });
  test('Signup must get name - negative', async () => {
    await request(app)
      .post(ROUTES.SIGNUP)
      .send({ password: '0000000' })
      .expect(400);
  });
  test('Login route working', async () => {
    // false;
    const result = await request(app)
      .post(ROUTES.LOGIN)
      .set('ip', '5.5.5.5.5')
      .set('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36')
      .send(MOCK_USER_DATA_ROUTES2)
      .expect((res) => {
        // return res
      })
      .expect(200);
    await request(app)
      .post(ROUTES.AUTHENTICATE)
      .set('client_token', result.body.token)
      .expect((res) => {
        // console.log(res.error)
      })
      .expect(200);
  });
  test('list route working', async () => {
    const result = await request(app)
      .post(ROUTES.LOGIN)
      .set('ip', '5.5.5.5.5')
      .set('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36')
      .send(MOCK_USER_DATA_ROUTES3)
      .expect((res) => {
        // return res
        res.error && console.log(res.error);
      })
      .expect(200);
    await request(app)
      .post(ROUTES.ACTIVE_LIST)
      .set('client_token', result.body.token)
      .expect((res) => {
        // console.log(res.body)
      })
      .expect(200);
  });
  afterAll(() => {
    server.close();
  });
  test('details route working', async () => {
    const result = await request(app)
      .post(ROUTES.LOGIN)
      .set('ip', '5.5.5.5.5')
      .set('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36')
      .send(MOCK_USER_DATA_ROUTES3)
      .expect((res) => {
        // return res
        res.error && console.log(res.error);
      })
      .expect(200);
    details = await request(app)
      .post(ROUTES.DETAILS)
      .send({ user_id: result.body.user._id })
      .set('client_token', result.body.token)
      .expect((res) => {
        res.error && console.log(res.error);
        // res.body && console.log(res.body)
      })
      .expect(200);
    return expect(details.body.list.length > 0);
  });
  afterAll(() => {
    server.close();
  });
});
