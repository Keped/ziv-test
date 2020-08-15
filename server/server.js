const path = require('path');
const express = require('express');
// const cors = require('cors');
const router = require('./src/routes');
const { tokenVerifier } = require('./src/helpers/jwt_helper');
const { PORT, STATIC_PATH } = require('./src/config');
// instantiate app
const app = express();
// app.use(cors());
app.use(express.json());
// our auth middleware
app.use(tokenVerifier);
// RESTful APIs
app.use(router);
// Static files
// app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, STATIC_PATH)));

// set port, listen for requests, also export for tests
// export the app itself so we can e2e
module.exports.app = app;
// server instance we can kill when done
module.exports.server = app.listen(PORT, () => {
  // console.log(`Server is running on port ${PORT}.`);
});
