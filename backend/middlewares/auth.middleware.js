const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (request, response, next) => {
  const token =
    request.cookies.token || request.headers.authorization?.split(" ")[1];

  const isBlackListed = await userModel.findOne({ token: token });
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
