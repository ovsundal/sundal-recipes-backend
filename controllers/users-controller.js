const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  // body input error
  if (!errors.isEmpty()) {
    console.log(errors);

    return next(new HttpError(`Invalid inputs passed, please try again`, 422));
  }

  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = new User({
    username,
    password: hashedPassword
  });

  try {
    await createdUser.save();
  } catch (e) {
    return next(new HttpError("Signing up failed", 500));
  }

  // add JWT
  let token;

  try {
    token = jwt.sign({ userId: createdUser.id }, process.env.JWT_KEY, {
      expiresIn: "1h"
    });
  } catch (e) {
    return next(new HttpError("Signing up failed", 500));
  }

  await res.status(201).json({ userId: createdUser.id, username, token });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ username });
  } catch (e) {
    return next(
      new HttpError("Logging in failed, please try again later", 500)
    );
  }

  if (!existingUser) {
    return next(new HttpError("Invalid credentials, could not login", 401));
  }

  let passwordIsValid = false;

  try {
    passwordIsValid = await bcrypt.compare(password, existingUser.password);
  } catch (e) {
    return next(
      new HttpError("Logging in failed, please try again later", 500)
    );
  }

  if (!passwordIsValid) {
    return next(new HttpError("Invalid credentials, could not login", 401));
  }

  // add JWT
  let token;

  try {
    token = jwt.sign({ userId: existingUser.id }, process.env.JWT_KEY, {
      expiresIn: "1h"
    });
  } catch (e) {
    return next(new HttpError("Logging in failed", 500));
  }

  res.json({
    username,
    token
  });
};

exports.signup = signup;
exports.login = login;
