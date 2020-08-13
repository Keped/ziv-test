module.exports.ROUTES = {
    HEALTH: '/',
    SIGNUP: '/signup',
    LOGIN:  '/login',
    AUTHENTICATE:   '/auth',
    ACTIVE_LIST:'/currently_logged_in',
    DETAILS:'/user_details',
    LOGOUT:'/logout'
}
module.exports.ERRORS = {
    SIGNUP_USERNAME_EXISTS: 'user_exists',
    LOGIN_NO_SUCH_USER: 'no_such',
    LOGIN_BAD_PASSWORD: 'bad_password',
    CANDIDATES_BAD_TOKEN: 'bad_token'
}

module.exports.MOCK_USER_DATA_ROUTES1 = {name:'routes1', password:'adminadmin2'};
module.exports.MOCK_USER_DATA_ROUTES2 = {name:'routes2', password:'adminadmin2'};
module.exports.MOCK_USER_DATA_ROUTES3 = {name:'routes3', password:'adminadmin2'};
module.exports.MOCK_USER_DATA_MODELS1 = {name:'models1', password:'adminadmin2'};
module.exports.MOCK_USER_DATA_MODELS2 =  {name:'models2', password:'adminadmin2'};
module.exports.MOCK_USER_DATA_MODELS3 = {name:'models3', password:'adminadmin2'} ;
module.exports.MOCK_USER_DATA_MODELS4 = {name:'models4', password:'adminadmin2'};