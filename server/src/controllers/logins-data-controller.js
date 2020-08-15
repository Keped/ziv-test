/* eslint-disable no-underscore-dangle */

/*
  This Controller serves logins data. here we convert the search results from the buckets
  we get from mongo agg to be client ready.
*/
const LoginModel = require('../models/login-model');

const toMinutes = (n) => Math.round(n / (1000 * 60));
// return the user's elapsed login times,current and last
const getLoginTimesMinutes = (currentLogin, lastLogin) => {
  // calculate elapsed time
  const minutesResults = {
    currentMinutes: toMinutes(Math.abs(new Date() - currentLogin.createdAt)),
    lastMinutes: 'N/A',
  };
  if (lastLogin) {
    const lastDiff = Math.abs(lastLogin.lastUpdatedAt - lastLogin.createdAt);
    minutesResults.lastMinutes = toMinutes(lastDiff);
  }
  return minutesResults;
};
// should ideally be another $projection...
const deconstructAggBucket = (rawUserData) => {
  const { counter } = rawUserData;
  // get current and last logins
  const currentLogin = rawUserData.top_logins[0];
  // maybe it's the user's first time?
  const lastLogin = typeof rawUserData.top_logins[1] !== 'undefined' && rawUserData.top_logins[1];
  const { lastMinutes, currentMinutes } = getLoginTimesMinutes(currentLogin, lastLogin);
  // destructure user and meta data
  const { user, ip, userAgent } = currentLogin;
  const { name, lastUpdateTime, createdAt } = user;
  return {
    counter,
    userId: user._id,
    ip,
    userAgent,
    name,
    lastUpdateTime,
    createdAt,
    lastMinutes,
    currentMinutes,
  };
};

const LoginsDataController = {

  getList: async (req, res) => {
    try {
      // this list gives the latest 2 logins per user
      const rawAggResult = await LoginModel.getActives();
      const resultList = {};
      rawAggResult.forEach((rawUserData) => {
        const userRes = deconstructAggBucket(rawUserData);
        resultList[userRes.userId] = userRes;
      });
      res.status(200).send({ resultList });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
module.exports = LoginsDataController;
