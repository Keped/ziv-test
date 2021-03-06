const UserModel = require('../../src/models/user-model');

const MOCK_USER_DATA = { name: 'TEST_USER', password: 'adminadmin2' };

describe('USER MODEL - SIGN UP', () => {
  beforeAll(() => UserModel.deleteOne({ name: MOCK_USER_DATA.name }));

  test('Users model Sign Up', async () => {
    const { name, password } = MOCK_USER_DATA;
    const signUpResult = await UserModel.signUp(name, password);
    return expect(signUpResult.email).toEqual(MOCK_USER_DATA.email);
  });
});
