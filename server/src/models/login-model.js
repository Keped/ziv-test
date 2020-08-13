/* eslint-disable quotes */
/* eslint-disable quote-props */
/**
 * The Login model encapsulates the logic connected with keeping tabs on user activity
 * the main method is "getActives" wichh aggregates login events by user
 */

const mongoose = require('./client');
const UserModel = require('./user-model');

const { Schema } = mongoose;

const loginSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: UserModel.modelName,
  },
  ip: String,
  userAgent: String,
  createdAt: Date,
  lastUpdatedAt: Date,
  active: Boolean,
});
loginSchema.statics.authenticateForName = async function (name) {
  try {
    const user = await UserModel.findOne({name}).exec();
    const loggedInData = await this.findOne({user,active:true}).exec();
    return (loggedInData);
  } catch (e) {
    if (!loggedInData) {
      throw ('NOT FOUND IN LOGINS');
    }
  }
};

loginSchema.statics.getActives = async function () {
  const pipeline = [

    {
      "$sort": { "_id": -1 },
    },
    {
      "$lookup": {
        "from": "users",
        "localField": "user",
        "foreignField": "_id",
        "as": "user",
      },
    },
    {
      "$unwind": "$user",
    },
    {
      "$group": {
        "_id": "$user._id",
        "counter": { "$sum": 1 },
        "logins": {
          "$push": "$$ROOT",
        },
      },
    },

    {
      "$project":
          {
            "top_logins":
              {
                "$slice": ["$logins", 3],
              },
            "counter": "$counter",
          },
    },
  ];
  return this.aggregate(pipeline).exec();
};
// create a login event if neccesary
loginSchema.statics.startLogin = async function (ip, userAgent, user) {
  try {
    const found = await this.findOne({ user: user._id, active: true }).exec();
    if (!found) {
      throw ('need to create');
    }
    return found;
  } catch (e) {
    return this.create({
      ip,
      userAgent,
      user,
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
      active: true,
    });
  }
};

// create a login event if neccesary
loginSchema.statics.endLogin = async function (user) {
  const newData = { active: false, lastUpdatedAt: new Date() };
  return this.findOneAndUpdate({ user: user._id, active: true }, newData).exec();
};
const Login = mongoose.model('Login', loginSchema);
module.exports = Login;
