/*
    The Routes module takes care of validations on input, and than pass the request to controller.
    This seperates business logic and authentication from initial validation.
*/

const express = require('express');

const router = express.Router();
const { body, header, validationResult } = require('express-validator');
const { ROUTES } = require('../constants');
const AuthController = require('../controllers/auth-controller');
const LoginsDataController = require('../controllers/logins-data-controller');

const doValidate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return null;
};

router.get(ROUTES.HEALTH, (req, res, next) => {
  try {
    res.status(200).send('ONLINE');
  } catch (err) {
    next(err);
  }
});
router.post(ROUTES.SIGNUP, [
  body('password').isLength({ min: 6 }),
  body('name').exists(),

], async (req, res, next) => {
  if (!doValidate(req, res)) {
    return AuthController.signUp(req, res, next);
  }
});
router.post(ROUTES.LOGOUT, [
  header('client_token').exists(),
], async (req, res, next) => {
  if (!doValidate(req, res)) {
    return AuthController.logOut(req, res, next);
  }
});
router.post(ROUTES.LOGIN, [
  body('password').isLength({ min: 6 }),
  body('name').exists(),
], (req, res, next) => {
  if (!doValidate(req, res)) {
    return AuthController.logIn(req, res, next);
  }
});
router.post(ROUTES.AUTHENTICATE, [
  header('client_token').exists(),
], async (req, res, next) => {
  if (!doValidate(req, res)) {
    return AuthController.authenticate(req, res, next);
  }
});
router.post(ROUTES.ACTIVE_LIST, [
  header('client_token').exists(),
], async (req, res, next) => {
  if (!doValidate(req, res)) {
    return LoginsDataController.getList(req, res, next);
  }
});

module.exports = router;
