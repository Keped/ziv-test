/**
 * User Model
 * 
 */
const mongoose = require('./client');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    password:String,
    loginTime: Date,
    createdAt:Date,
    lastUpdateTime: Date,
    
  });
  userSchema.statics.signUp = async function (name, password) {
        // create hashed password
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        const found = await this.findOne({name});
        if (found){
            throw({error:'ERRORS.SIGNUP_USERNAME_EXISTS'});
        }
        const now = new Date();
        // a user is born in DB !
        const user = await this.create({
            name, 
            password:passwordHash,
            createdAt:now,
            lastUpdateTime:now
        });
        return user;
  
  }

  userSchema.statics.logIn = async function (name, password) {
        let user = null;
        let passwordIsCorrect = false;
        try{
            user = await this.findOne({name});
            // console.log(user)
            passwordIsCorrect = bcrypt.compareSync(password,user.password);
        }catch(e){
            console.error(e)
            throw({error:"ERRORS.LOGIN_NO_SUCH_USER"});
        }
        if (!passwordIsCorrect){
            // console.log("OMG", user)
            throw({error: "ERRORS.LOGIN_BAD_PASSWORD"});
        }
        return user;
  }

const User = mongoose.model('User', userSchema);
module.exports =User;