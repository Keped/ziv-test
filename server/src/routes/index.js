/* 
    The Routes module takes care of validations on input, and than pass the request to controller.
   
*/

const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    try {
      res.status(200).send("ONLINE");
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;  