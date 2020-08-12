const  UserModel = require( './src/models/user-model');
const { findRepos } = require('jest-changed-files');
const {MOCK_USER_DATA_ROUTES1, MOCK_USER_DATA_ROUTES2, MOCK_USER_DATA_ROUTES3, MOCK_USER_DATA_MODELS1, MOCK_USER_DATA_MODELS2} = require('./src/constants')

// module.exports.MOCK_USERS = {
//     MOCK_USER_DATA_ROUTES1,
//     MOCK_USER_DATA_ROUTES2,
//     MOCK_USER_DATA_ROUTES3,
//     MOCK_USER_DATA_MODELS1,
//     MOCK_USER_DATA_MODELS2,
//     MOCK_USER_DATA_MODELS3,
//     MOCK_USER_DATA_MODELS4
// }
module.exports = ()=>{

    UserModel.signUp(MOCK_USER_DATA_ROUTES1.name, MOCK_USER_DATA_ROUTES1.password).catch(()=>{});
    UserModel.signUp(MOCK_USER_DATA_ROUTES2.name, MOCK_USER_DATA_ROUTES1.password).catch(()=>{});
    UserModel.signUp(MOCK_USER_DATA_ROUTES3.name, MOCK_USER_DATA_ROUTES1.password).catch(()=>{});
    UserModel.signUp(MOCK_USER_DATA_MODELS2.name, MOCK_USER_DATA_MODELS2.password).catch(()=>{});
    return UserModel.signUp(MOCK_USER_DATA_MODELS1.name, MOCK_USER_DATA_MODELS1.password).catch(()=>{});
}