/* eslint-disable no-underscore-dangle */
/**
 * User Model, define user document
 * use bcryptjs to hash passwords
 */
const bcrypt = require('bcryptjs');
const mongoose = require('./client');
const { ERRORS } = require('../constants');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, unique: true },
  password: String,
  loginTime: Date,
  createdAt: Date,
  lastUpdateTime: Date,
  isLoggedIn: Boolean,
});
userSchema.statics.signUp = async function (name, password) {
  // create hashed password
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);
  const found = await this.findOne({ name });
  if (found) {
    throw Error(ERRORS.SIGNUP_USERNAME_EXISTS);
  }
  const now = new Date();
  // a user is born in DB !
  const user = await this.create({
    name,
    password: passwordHash,
    createdAt: now,
    lastUpdateTime: now,
  });
  return user;
};
userSchema.statics.logOut = async function (name) {
  try {
    // find our guy in db
    const user = await this.findOne({ name });
    user.set('isLoggedIn', false);
    user.set('lastUpdateTime', new Date());
    user.save();
  } catch (e) {
    throw Error(ERRORS.LOGIN_NO_SUCH_USER);
  }
};

userSchema.statics.logIn = async function (name, password) {
  let user = null;
  let passwordIsCorrect = false;
  try {
    // find our guy in db
    user = await this.findOne({ name });
    // if found, compare his cached password to authenticate
    passwordIsCorrect = bcrypt.compareSync(password, user.password);
  } catch (e) {
    throw Error(ERRORS.LOGIN_NO_SUCH_USER);
  }
  if (!passwordIsCorrect) {
    throw Error(ERRORS.LOGIN_BAD_PASSWORD);
  }
  // if he's already here, let's return him
  if (user.isLoggedIn) {
    return user;
  }
  // if not, set as saved
  user.set('lastUpdateTime', new Date());
  user.set('isLoggedIn', true);
  user.save();
  return user;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
