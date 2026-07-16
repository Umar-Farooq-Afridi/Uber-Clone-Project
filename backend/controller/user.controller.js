const { response } = require("express");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = request.body;

  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    return response.status(400).json({ message: "User Already exist" });
  }

  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
  });

  const token = user.generateAuthToken();
  response.status(201).json({ token, user });
};

module.exports.loginUser = async (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(404).json({ errors: errors.array() });
  }

  const { email, password } = request.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return response.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return response.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();
  response.cookie("token", token);
  response.status(200).json({ token, user });
};

module.exports.getUserProfile = async (request, response, next) => {
  response.status(200).json(request.user);
};

module.exports.logoutUser = async (request, response, next) => {
  response.clearCookie("token");
  const token =
    request.cookies.token || request.headers.authorization.split(" ")[1];

  await blacklistTokenModel.create({ token });
  response.status(200).json({ message: "User Logout" });
};
