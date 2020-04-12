const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const AppError = require("../utilis/appError");
const { User } = require("../models");

const checkDuplicateEmail = async (email, excludeUserId) => {
  const user = await User.findOne({ email, _id: { $ne: excludeUserId } });
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email already taken");
  }
};

const checkPassword = async (password, correctPassword) => {
  const isPasswordMatch = await bcrypt.compare(password, correctPassword);
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Passwords do not match");
  }
};

const createUser = async (userBody) => {
  await checkDuplicateEmail(userBody.email);
  const user = await User.create(userBody);
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "No user found with this email");
  }
  return user;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

const loginUser = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    await checkPassword(password, user.password);
    return user;
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
};

module.exports = {
  createUser,
  getUserById,
  checkPassword,
  getUserByEmail,
  loginUser,
};
