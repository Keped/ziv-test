const UserModel = require('../models/user-model');
const LoginModel = require('../models/login-model');
const jwtService = require('../helpers/jwt_helper');
const useragent = require('useragent');

const onAuthSuccessful = (user,res)=>{
    // console.log(user)
    const token = jwtService.makeNewToken(user.name);
    console.log(token)

    res.status(200).send({token,user:user.toJSON()});
    
  };
  
  
/* 
  This Controller invokes the user model functionality and takes care of returning a new jwt token for successful authorizations.

*/

const AuthController = {
  
    signUp: async (req, res, next) => {
        try {
          const {name, password} = req.body; // these have been previously verified
          const user = await UserModel.signUp(name, password)
          onAuthSuccessful(user, res);
        } catch (err) {
  
            res.status(400).send("user_exists")
        }
    },
    
    logIn: async (req, res, next) => {
      try {
        const {name, password} = req.body; // these have been previously verified
        const user = await UserModel.logIn(name, password)
        // console.log(req.headers)
        const agent = useragent.parse(req.headers['user-agent']);
        const sessionStarted = await LoginModel.startLogin(req.headers['ip'], agent.toAgent(), user);
         onAuthSuccessful(user, res);
      } catch (err) {
          console.error(err)
        res.status(403).send(err)
      } 
    },
    authenticate: async (req, res, next) => {
        try {
            console.log(req.body.nameFromAuth)
            const user = await UserModel.findOne({name: req.body.nameFromAuth}).exec();
            const loggedIn = await LoginModel.findOne({user,active:true}).exec();
            onAuthSuccessful(user, res);
        } catch (err) {
            res.status(403).send(err);
        } 
      }
  };
  module.exports = AuthController;