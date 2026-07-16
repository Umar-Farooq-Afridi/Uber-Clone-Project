const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blacklistToken.model");

module.exports.authUser = async (request, response, next) => {
  const token =
    request.cookies.token || request.headers.authorization?.split(" ")[1];

  const isBlackListed = await blackListTokenModel.findOne({ token: token });
  if (isBlackListed) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  if (!token) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    request.user = user;
    return next();
  } catch (error) {
    return response.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.authCaptain = async (request, response, next) => {
  const token =
    request.cookies.token || request.headers.authorization?.split(" ")[1];

  const isBlackListed = await blackListTokenModel.findOne({ token: token });
  if (isBlackListed) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  if (!token) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);

    request.captain = captain;
    return next();
  } catch (error) {
    return response.status(401).json({ message: "Unauthorized" });
  }
};
