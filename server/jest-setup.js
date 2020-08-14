const UserModel = require('./src/models/user-model');
const LoginModel = require('./src/models/login-model');
const {
  MOCK_USER_DATA_ROUTES1,
  MOCK_USER_DATA_ROUTES2,
  MOCK_USER_DATA_ROUTES3,
  MOCK_USER_DATA_MODELS1,
  MOCK_USER_DATA_MODELS2,
} = require('./src/constants');
// just populating db to start
module.exports = () => {
  LoginModel.remove().exec();
  UserModel.signUp(MOCK_USER_DATA_ROUTES1.name, MOCK_USER_DATA_ROUTES1.password)
    .catch(() => {});
  UserModel.signUp(MOCK_USER_DATA_ROUTES2.name, MOCK_USER_DATA_ROUTES1.password)
    .catch(() => {});
  UserModel.signUp(MOCK_USER_DATA_ROUTES3.name, MOCK_USER_DATA_ROUTES1.password)
    .catch(() => {});
  UserModel.signUp(MOCK_USER_DATA_MODELS2.name, MOCK_USER_DATA_MODELS2.password)
    .catch(() => {});
  return UserModel.signUp(MOCK_USER_DATA_MODELS1.name, MOCK_USER_DATA_MODELS1.password)
    .catch(() => {});
};
