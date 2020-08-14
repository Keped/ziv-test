/**
 * connecting to mongo and instantiating mongoose client
 */
const mongoose = require('mongoose');
const { MONGO_PATH } = require('../config');

// some preperations...
const MONGO_PREFIX = 'mongodb://';
mongoose.Promise = global.Promise;
const dbPath = `${MONGO_PREFIX}${MONGO_PATH}`;
// connecting
mongoose.connect(dbPath, { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  // we're connected!
});
module.exports = mongoose;
