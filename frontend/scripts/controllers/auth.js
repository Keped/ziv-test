var appState = {status:"unauthorized", user:null}; 
var onUnAuthorized = function (){
    StorageService.set(TAB_SESSION_TOKEN, null);
    appState.status = 'authorized';
    appState.user = null;
    setUserBox(false)
    return "oh oh ";
}
var onAuthorized = function (token,user){
    StorageService.set(TAB_SESSION_TOKEN, token);
    appState.status = 'authorized';
    appState.user = user;
    setUserBox(user)

    return "User: "+user.name;
}
var checkAuthStatus = async function(){
        
        try {
            const oldToken = StorageService.get(TAB_SESSION_TOKEN);
            console.log(oldToken)
            const result = await ApiService.authenticate(oldToken);
            const {token, user} = result;
            if(token){
                return onAuthorized(token, user);
            }else{
                return onUnAuthorized();
            }
        }catch(e){
            return onUnAuthorized();
        }
    
}
var logIn = async function(name,password){
    try {
        const result = await ApiService.logIn(name,password);
        console.log(result)
        const {token, user} = result;
        if(token){
            return onAuthorized(token, user);
        }else{
            return onUnAuthorized();
        }
    }catch(e){
        return onUnAuthorized();
    }
}

var signUp = async function(name,password){
    try {
        const result = await ApiService.signUp(name,password);
        console.log(result)
        if(result.error){
          console.error(result.error)
        }else{
            // appStatus = 'authorized';
            return true;            
        }
    }catch(e){

    }
}
var logOut = function(){
    
    const token = StorageService.get(TAB_SESSION_TOKEN);
    ApiService.logOut(token).then((res)=>{});
    onUnAuthorized();
}