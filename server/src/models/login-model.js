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

const Login = mongoose.model('Login', loginSchema);
module.exports =Login;
