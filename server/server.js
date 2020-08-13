const express = require('express');
const cors = require('cors');
const router = require('./src/routes');
// TBD implement
const { tokenVerifier } = require('./src/helpers/jwt_helper');
const { PORT } = require('./src/config');

const app = express();
app.use(cors());
app.use(express.json());
app.use(tokenVerifier);
app.use(router);
app.use(express.static('../frontend'));
// set port, listen for requests, also export for tests
// export the app itself so we can e2e
module.exports.app = app;
// server instance we can kill when done
module.exports.server = app.listen(PORT, () => {
  // console.log(`Server is running on port ${PORT}.`);
});
