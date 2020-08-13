const mongoose = require('mongoose');
const { MONGO_PATH } = require('../config');

mongoose.Promise = global.Promise;
// TBD ENVIROMENT VARIABLE 'mongodb://localhost/test'
mongoose.connect('mongodb://elemongo:27017/test', { useNewUrlParser: true });
const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
});
module.exports = mongoose;
