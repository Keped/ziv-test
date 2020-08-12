const UserModel = require('../models/user-model');
const LoginModel = require('../models/login-model');

  
  
/* 
  This Controller serves logins data

*/

const ApiController = {
  
    getList: async (req, res, next) => {
        try {
            
            const list = await LoginModel.getActives();
            // console.log(list)
            res.status(200).send({list});
        } catch (err) {
            console.error(err)
            res.status(500).send(err);
        } 
      },
      getDetails: async (req, res, next) => {
        try {
            
            const list = await LoginModel.getDetails(req.body.user_id);
            console.log(list)
            res.status(200).send({list});
        } catch (err) {
            console.error(err)
            res.status(500).send(err);
        } 
      }
  };
  module.exports = ApiController;