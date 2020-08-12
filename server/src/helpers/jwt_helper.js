const jwt = require('jsonwebtoken');
const { ROUTES, ERRORS } = require('../constants');
const {AUTHENTICATE, ACTIVE_LIST} = ROUTES;
const JWT_SECRET = "TODO MOVE TO ENVE";
// taking care of jwt ops

// used by controller to return new token
const makeNewToken = (name) => jwt.sign({
    data: name
}, 
JWT_SECRET);

const verifyToken = (token) => {

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch(err) {
        throw(err);
    }
    
}

// middleware placed in front of candidates model to check token (header existence verified in router)
const tokenVerifier = (req,res,next) => {
    if([AUTHENTICATE, ACTIVE_LIST].indexOf(req.url) != -1 ){
        try{

            const decoded = verifyToken(req.headers.client_token);

            req.body.nameFromAuth = decoded.data;
            next();
        }catch(e){

            res.status(403).send(ERRORS.BAD_TOKEN);
        }
    }else{
        next();
    }
};

exports.tokenVerifier = tokenVerifier;
exports.verifyToken = verifyToken;
exports.makeNewToken = makeNewToken;
