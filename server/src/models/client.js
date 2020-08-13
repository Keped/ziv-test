const mongoose = require('mongoose');
/**
 * just connecting to mongo and instantiating mongoose client
 */
const path = require('path');
const { MONGO_PATH } = require('../config');
const MONGO_PREFIX = 'mongodb://';
mongoose.Promise = global.Promise;

mongoose.connect(path.join(MONGO_PREFIX, MONGO_PATH), { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', () => {
  // we're connected!
});
module.exports = mongoose;
