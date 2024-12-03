const HttpError = require('../helpers/HttpError.helpers');
const Response = require('../helpers/Response.helpers');
const { UserService } = require('../services/user.service');

class UserController {
  signUp = async (req, res) => {
    const body = req.body;
    //validation should apply here for upcoming body
    let existingUser = await UserService.findOne({ email: body.email }).lean();
    if (existingUser) throw new HttpError(409, 'User Already Exists!');

    const user = await UserService.create(body);
    sendTokenResponse(user, res, 'Successfully User Created', 201);
  };
  login = async (req, res) => {
    const { email, password } = req.body;
    let user = UserService.findOne({ email });
    //cheking user existance
    if (!user) throw new HttpError(401, 'Invalid Credentials!');

    const isMatch = await user.comparePassword(password);
    //verifying password
    if (!isMatch) throw new HttpError(401, 'Invalid Credentials!');

    user = await user.lean();
    sendTokenResponse(user, res, 'Logged in successfully!');
  };
  getCurrentUser = async (req, res) => {
    const user = await UserService.findById(req.user._id);
    Response(res).body(user).send();
  };
}

// Get token from model, create cookie and send response
const sendTokenResponse = async (user, res, message, statusCode = 200) => {
  //generating token
  const accessToken = user.generateToken();
  const refreshToken = user.generateRefreshToken();
  const currentUser = await user.lean();

  Response(res)
    .body({
      user: currentUser,
      refreshToken,
      accessToken
    })
    .status(statusCode)
    .message(message)
    .send();
};

module.exports.UserController = new UserController();
