/* 
    The Routes module takes care of validations on input, and than pass the request to controller.
   
*/

const express = require('express');
const router = express.Router();
const { ROUTES } = require('../constants');
const AuthController = require('../controllers/auth-controller');
const { body, header, validationResult } = require('express-validator');
const ApiController = require('../controllers/api-controller');


const doValidate = (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(req.url,errors.array())
      return res.status(400).json({ errors: errors.array() });
    }
}


router.get(ROUTES.HEALTH, (req, res, next) => {
    try {
      res.status(200).send("ONLINE");
    } catch (err) {
      next(err);
    }
  }
);
router.post(ROUTES.SIGNUP, [
    body('password').isLength({ min: 6 }),
    body('name').exists()

  ],async(req, res, next)=>{

    if(!doValidate(req, res)) {
        return AuthController.signUp(req,res,next);
    }
  }
);

router.post(ROUTES.LOGIN, [
      body('password').isLength({ min: 6 }),
      body('name').exists()
    ], async (req, res, next) => {
        if(!doValidate(req, res)) {
            return AuthController.logIn(req,res,next);
        }
    }
);
router.post(ROUTES.AUTHENTICATE, [
    header('client_token').exists()
  ], async (req, res, next) => {
      if(!doValidate(req, res)) {
          return await AuthController.authenticate(req,res,next);
      }
  }
);
router.post(ROUTES.ACTIVE_LIST, [
    header('client_token').exists()
  ], async (req, res, next) => {
      if(!doValidate(req, res)) {
          return await ApiController.getList(req,res,next);
      }
  }
);
router.post(ROUTES.DETAILS, [
    header('client_token').exists(),
    body('user_id').exists()
  ], async (req, res, next) => {
      if(!doValidate(req, res)) {
          return await ApiController.getDetails(req,res,next);
      }
  }
);

module.exports = router;  