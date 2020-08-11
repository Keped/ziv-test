const express = require("express");
const router = require('./src/routes');
//TBD implement
// const {tokenVerifier} = require('./src/helpers/jwt_helper');
const cors = require('cors');
   

const app = express();
app.use(cors());
app.use(express.json());
// app.use(tokenVerifier); // TBD
app.use(router);
// set port, listen for requests, also export for tests
const PORT = 8080; // TBD from env variable
// export the app itself so we can e2e
module.exports.app = app;
// server instance we can kill when done
module.exports.server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
