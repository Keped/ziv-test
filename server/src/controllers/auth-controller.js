/*
  This Controller invokes the user model functionality and
  takes care of returning a new jwt token for successful authorizations.
  It is assumed that validations and authentications have already happened
*/

const useragent = require('useragent');
const UserModel = require('../models/user-model');
const LoginModel = require('../models/login-model');
const jwtService = require('../helpers/jwt_helper');
// generic response for token bearing calls
const onAuthSuccessful = (user, res) => {
  const token = jwtService.makeNewToken(user.name);
  res.status(200).send({ token, user: user.toJSON() });
};

const AuthController = {

  signUp: async (req, res) => {
    try {
      const { name, password } = req.body; // these have been previously verified
      const user = await UserModel.signUp(name, password);
      onAuthSuccessful(user, res);
    } catch (err) {
      res.status(400).send('user_exists');
    }
  },
  logOut: async (req, res) => {
    try {
      const name = req.body.userName;
      const user = await UserModel.findOne({ name }).exec();
      await LoginModel.endLogin(user);
      res.status(200).send({ result: 'success' });
    } catch (err) {
      res.status(403).send(err);
    }
  },
  logIn: async (req, res) => {
    try {
      const { name, password } = req.body; // these have been previously verified
      // verify name and pass against users db (keeping state)
      const user = await UserModel.logIn(name, password);
      const agent = useragent.parse(req.headers['user-agent']);
      // create a login event (keeping history)
      await LoginModel.startLogin(req.connection.remoteAddress || req.ip, agent.toAgent(), user);
      onAuthSuccessful(user, res);
    } catch (err) {
      res.status(403).send(err);
    }
  },
  authenticate: async (req, res) => {
    try {
      const user = await UserModel.findOne({ name: req.body.userName }).exec();
      onAuthSuccessful(user, res);
    } catch (err) {
      res.status(403).send(err);
    }
  },
};
module.exports = AuthController;
