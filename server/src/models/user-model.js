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
      try{
          const now = new Date();
          // a user is born in DB !
          const user = await this.create({
                name, 
                password:passwordHash,
                createdAt:now,
                lastUpdateTime:now
          });
          return user;
      }catch(e){
          console.error(e)
          throw('ERRORS.SIGNUP_USERNAME_EXISTS');
      }
  }

  userSchema.statics.logIn = async function (name, password) {
        let user = null;
        let passwordIsCorrect = false;
        try{
            user = await this.findOne({name});
            passwordIsCorrect = bcrypt.compareSync(loginData.password,user.password);
        }catch(e){
            console.error(e)
            throw("ERRORS.LOGIN_NO_SUCH_USER");
        }
        if (!passwordIsCorrect){
            console.log("OMG", user)
            throw( "ERRORS.LOGIN_BAD_PASSWORD");
        }
  }

const User = mongoose.model('User', userSchema);
module.exports =User;