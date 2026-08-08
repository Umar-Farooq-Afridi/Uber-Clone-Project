const { request, response } = require("express");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = request.body;

  const isCaptainAlreadyExist = await captainModel.findOne({ email });
  if (isCaptainAlreadyExist) {
    return response.status(400).json({ message: "Captain Already exist" });
  }

  const hashPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();
  response.status(201).json({ captain, token });
};

module.exports.loginCaptain = async (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  const { email, password } = request.body;

  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return response.status(400).json({ errors: errors.array() });
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return response.status(400).json({ errors: errors.array() });
  }

  const token = captain.generateAuthToken();
  response.cookie("token", token);
  response.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async (request, response, next) => {
  response.status(200).json({ captain: request.captain });
};

module.exports.logoutCaptain = async (request, response, next) => {
  const token =
    request.cookies.token || request.headers.authorization.split("")[1];
  await blacklistTokenModel.create({ token });
  response.clearCookie("token");

  response.status(200).json({ message: "Captain Logout Successfully" });
};
