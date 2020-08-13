const LoginModel = require('../models/login-model');

/*
  This Controller serves logins data
*/

const ApiController = {

  getList: async (req, res) => {
    try {
      const list = await LoginModel.getActives();
      res.status(200).send({ list });
    } catch (err) {
      res.status(500).send(err);
    }
  }
};
module.exports = ApiController;
