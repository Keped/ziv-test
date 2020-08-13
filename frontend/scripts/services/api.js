var isLoading = false;

const _request = async function(method, url, data, token){
    let headers = {
        'Content-Type': 'application/json'
    };
    if(token){
        headers['client_token'] = token;
    }
    try{
        isLoading = true;
        const response = await fetch(url,{
            method,
            body: data && JSON.stringify(data),
            headers
        })
        isLoading = false;
        return response.json()
    }catch(e){
        isLoading = false;
        throw(e)
    }

}


var ApiService = {
    logIn:async (name,password)=>{return _request('POST',ROUTES.LOGIN,{name,password});},
    signUp:async (name,password)=>{return _request('POST',ROUTES.SIGNUP,{name,password});},
    authenticate:async (token)=>{return _request('POST',ROUTES.AUTHENTICATE,{},token);},
    getList:async (token)=>{return _request('POST',ROUTES.ACTIVE_LIST,null,token);},
    getDetails:async (userId)=>{return _request('POST',ROUTES.DETAILS,{user_id:userId},token);},
    logOut:async (token)=>{return _request('POST',ROUTES.LOGOUT,{},token);},
}