/* eslint-disable no-underscore-dangle */

/*
  This Controller serves logins data. here we convert the results from model to be client friendly
*/
const LoginModel = require('../models/login-model');

const toMinutes = (n) => Math.round(n / (1000 * 60));

const ApiController = {

  getList: async (req, res) => {
    try {
      // this list gives 2 logins per user,
      // we will combine those into a map of one object per user
      const list = await LoginModel.getActives();
      const resultList = {};
      const users = [];
      list.forEach((rawUserData) => {
        const { counter } = rawUserData;
        // get current and last logins
        const currentLogin = rawUserData.top_logins[0];
        // make sure user has two, if not some data changes
        const lastLogin = typeof rawUserData.top_logins[1] !== 'undefined' && rawUserData.top_logins[1];
        // destructure user and meta data
        const { user, ip, userAgent } = currentLogin;
        const { name, lastUpdateTime, createdAt } = user;
        // calculate elapsed time
        const currentMinutes = toMinutes(Math.abs(new Date() - currentLogin.createdAt));
        let lastMinutes = 'N/A';
        if (lastLogin) {
          const lastDiff = Math.abs(lastLogin.lastUpdatedAt - lastLogin.createdAt);
          lastMinutes = toMinutes(lastDiff);
        }
        resultList[user._id] = {
          name,
          userId: user._id,
          currentMinutes,
          createdAt,
          lastUpdateTime,
          ip,
          counter,
          userAgent,
          lastMinutes,
        };
        users.push(user);
      });
      res.status(200).send({ resultList });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
module.exports = ApiController;
