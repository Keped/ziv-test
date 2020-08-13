const path = require('path');
const express = require('express');
const cors = require('cors');
const router = require('./src/routes');
const { tokenVerifier } = require('./src/helpers/jwt_helper');
const { PORT } = require('./src/config');

const app = express();
app.use(cors());
app.use(express.json());
app.use(tokenVerifier);
app.use(router);
// app.use(express.static('./src/static'));
app.use(express.static(path.join(__dirname, './static')));
// app.get('/home', (req, res) => {
//   res.sendFile('./index.html', { root: path.resolve(__dirname,'static') });
// });

// set port, listen for requests, also export for tests
// export the app itself so we can e2e
module.exports.app = app;
// server instance we can kill when done
module.exports.server = app.listen(PORT, () => {
  // console.log(`Server is running on port ${PORT}.`);
});
