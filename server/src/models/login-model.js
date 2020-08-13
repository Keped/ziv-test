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
    lastUpdatedAt: Date,
    active:Boolean
});
loginSchema.statics.authenticateForName = async function(name){
  try{
    const user = await UserModel.findOne({name}).exec();
    const loggedInData = await this.findOne({user,active:true}).exec();    
    console.log(loggedInData)
    return(loggedInData);
  }catch(e){
    if (!loggedInData){

      throw("NOT FOUND IN LIGUNS");
    }
  }

}
loginSchema.statics.getDetails = async function(userId){
  const result = await this.find({'user':userId},null,{limit:2}).populate('user').exec();
  console.log(result)
  return result.map(
      (loginData)=>{
        
        let {_doc,user} = loginData;
        user = user?user.toJSON():false;
        return {..._doc, user};
  });
}

// loginSchema.statics.getActives = async function(){
//   const result = await this.find({active:true}).populate('user').exec();
//   return result.map(
//       (loginData)=>{
        
//         let {_doc,user} = loginData;
//         user = user?user.toJSON():false;
//         return {..._doc, user};
//   });
// }
loginSchema.statics.getActives = async function(){
    // const result = await this.find({active:true}).populate('user').exec();
    const pipeline = [
      
      {
        "$sort":{"_id":-1}
      },
      {
        "$lookup":{ 
            "from":"users",
            "localField":"user",
            "foreignField":"_id",
            "as":"user"
        }
      },
      {
        "$unwind":"$user"
      },
      {
        "$group":  {
            "_id":"$user._id",
            "counter": { "$sum": 1 },
            "logins":{
                "$push":"$$ROOT"
            }
          }    
      },
      
      {
        "$project":
          {
            "top_logins":
              {
                "$slice":["$logins", 3]
              },
              "counter":"$counter"
          }
      }
    ]
    const result = await this.aggregate(pipeline).exec();

    return result
}

loginSchema.statics.startLogin = async function (ip,userAgent, user) {
    console.log(user.name)
    try{
      const found = await this.findOne({'user':user._id, active:true}).exec();
      // console.log(found)
      if( !found){
        throw("need to create")
      }
      found.lastUpdatedAt = new Date();
      await found.save();
      return found;
    }catch(e){
      // console.error(e)

        return this.create({
          ip, 
          userAgent,
          user,
          createdAt:new Date(),
          lastUpdatedAt:new Date(),
          active:true
      });
    }

}
loginSchema.statics.endLogin = async function (user) {
    return  this.findOneAndUpdate({'user':user._id, active:true}, {active:false}).exec();  
}
const Login = mongoose.model('Login', loginSchema);
module.exports = Login;
