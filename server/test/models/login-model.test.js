const UserModel = require('../../src/models/user-model');
const LoginModel = require('../../src/models/login-model');
const { MOCK_USER_DATA_MODELS1, MOCK_USER_DATA_MODELS2 } = require('../../src/constants');

describe('LOGIN MODEL', () => {
  test('Login Stored in DB', async () => {
    const { name } = MOCK_USER_DATA_MODELS1;
    const user = await UserModel.findOne({ name });
    const loginData = {
      ip: '5.5.5.5.5',
      userAgent: 'MOCKMOCK',
      user,
      createdAt: new Date(),
      active: true,
    };

    await LoginModel.create(loginData);
    const found = await LoginModel.findOne(loginData);
    return expect(found.userAgent).toEqual(loginData.userAgent);
  });
  test('Session start and finish in model', async () => {
    const { name } = MOCK_USER_DATA_MODELS2;
    const user = await UserModel.findOne({ name });
    await LoginModel.startLogin('5.5.5.5.5', 'CHROME', user);
    const found = await LoginModel.findOne({ user, active: true });
    expect(found.userAgent).toEqual('CHROME');
    await LoginModel.endLogin(user);
    let noUser = true;
    try {
      noUser = await LoginModel.findOne({ user, active: true });
    } catch (e) {
    //
    }
    expect(noUser).toEqual(null);
  });
});
