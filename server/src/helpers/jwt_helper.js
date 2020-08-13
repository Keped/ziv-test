const jwt = require('jsonwebtoken');
const { ROUTES, ERRORS } = require('../constants');
const LoginModel = require('../models/login-model');

/**
 * This service takes care of jwt validations and creation.
 */

const {
  AUTHENTICATE, ACTIVE_LIST, DETAILS, LOGOUT,
} = ROUTES;
const JWT_SECRET = 'TODO MOVE TO ENVE';
// taking care of jwt ops

// used by controller to return new token
const makeNewToken = (name) => jwt.sign({
  data: name,
},
JWT_SECRET);

const verifyToken = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
};

// middleware placed in front of candidates model to check token
// (header existence verified in router)
const tokenVerifier = async (req, res, next) => {

  if ([AUTHENTICATE, ACTIVE_LIST, DETAILS, LOGOUT].indexOf(req.url) !== -1) {
    try {
      const decoded = verifyToken(req.headers.client_token);
      const foundUser = await LoginModel.authenticateForName(decoded.data);
      if (!foundUser) {
        res.status(403).send({ error: ERRORS.BAD_TOKEN });
      }
      req.body.userName = decoded.data;
      next();
    } catch (e) {
      res.status(403).send({ error: ERRORS.BAD_TOKEN });
    }
  } else {
    next();
  }
};

exports.tokenVerifier = tokenVerifier;
exports.verifyToken = verifyToken;
exports.makeNewToken = makeNewToken;
