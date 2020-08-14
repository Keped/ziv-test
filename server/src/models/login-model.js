/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable no-underscore-dangle */
/**
 * The Login model encapsulates the logic connected with keeping tabs on user activity
 * the main method is "getActives" wich aggregates login events per user
 * lint is configured to ignore some things that are required by/default in Mongo
 */

const mongoose = require('./client');
const UserModel = require('./user-model');

const { Schema } = mongoose;

const loginSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: UserModel.modelName,
    index: true,
  },
  ip: String,
  userAgent: String,
  createdAt: Date,
  lastUpdatedAt: Date,
  active: Boolean,
});

loginSchema.statics.getActives = async function () {
  // bucket aggregation of two latest logins per logged in user
  const pipeline = [
    {
      "$sort": { "_id": -1 }, // do fifo on all data
    },
    {
      "$lookup": { // necessary for grouping by a reference to user
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
      "$match": { "user.isLoggedIn": true }, // only want online ones
    },
    {
      "$group": {
        "_id": "$user._id",
        "counter": { "$sum": 1 }, // count when we still have all
        "logins": {
          "$push": "$$ROOT", // push for projection
        },
      },
    },

    {
      "$project": // show top two + counter
          {
            "top_logins":
              {
                "$slice": ["$logins", 2],
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
      throw Error('need to create');
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
