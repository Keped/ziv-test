const mongoose = require('./client');
const UserModel = require('./user-model');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref:  UserModel.modelName
    },
    ip:String,
    userAgent:String,
    createdAt: Date,
    active:Boolean
});

loginSchema.statics.getActives = async function(){
    const result = await this.find({active:true}).populate('user').exec();
    return result.map(
        (loginData)=>{
          
          let {_doc,user} = loginData;
          user = user?user.toJSON():false;
          return {..._doc, user};
    });
}

loginSchema.statics.startLogin = async function (ip,userAgent, user) {
    console.log(user.name)
    try{
      const found = await this.findOne({'user':user._id, active:true}).exec();
      console.log(found)
    
      return found;
    }catch(e){
      console.error(e)

        return this.create({
          ip, 
          userAgent,
          user,
          createdAt:new Date(),
          active:true
      });
    }

}
loginSchema.statics.endLogin = async function (user) {
    return  this.findOneAndUpdate({'user.name':user.name, active:true}, {active:false}).exec();  
}
const Login = mongoose.model('Login', loginSchema);
module.exports = Login;
