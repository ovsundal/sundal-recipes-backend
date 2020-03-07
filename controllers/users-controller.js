const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/users-model");
const bcrypt = require("bcryptjs");

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

  await res.status(201).json({ userId: createdUser.id, username });
};

exports.signup = signup;
