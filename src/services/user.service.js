const { User } = require('../models/Users.model');
const BasicServices = require('./basic.service');
const { UserPipelines } = require('../pipes/user.pipes');
class UserService extends BasicServices {
  constructor() {
    super(User);
  }
  getFulldetails = (userId, loggedUserId) => {
    return User.aggregate(UserPipelines.getAllDetailsOfUser(userId, loggedUserId));
  };
}

module.exports.UserService = new UserService();
