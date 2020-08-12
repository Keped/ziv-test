// const { ROUTES } = require("../../server/src/constants");

const _request = async function(method, url, data, token){
    let headers = {
        'Content-Type': 'application/json'
    };
    if(token){
        headers['client-token'] = token;
    }
    const response = await fetch(url,{
        method,
        body: data && JSON.stringify(data),
        headers
    })
}


var ApiService = {
    logIn:async (name,password)=>{return _request('POST',ROUTES.LOGIN,{name,password});},
    signUp:async (name,password)=>{return _request('POST',ROUTES.SIGNUP,{name,password});},
    authenticate:async (token)=>{return _request('POST',ROUTES.AUTHENTICATE,null,token);},
    getList:async (token)=>{return _request('POST',ROUTES.ACTIVE_LIST,null,token);},
    getDetails:async (userId)=>{return _request('POST',ROUTES.DETAILS,{user_id:userId},token);},

}