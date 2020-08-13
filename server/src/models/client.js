const mongoose = require('mongoose');
const { MONGO_PATH } = require('../config');

mongoose.Promise = global.Promise;
// TBD ENVIROMENT VARIABLE
mongoose.connect(MONGO_PATH, { useNewUrlParser: true });
const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
});
module.exports = mongoose;
