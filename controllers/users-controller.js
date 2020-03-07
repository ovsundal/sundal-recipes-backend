const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);

    return next(new HttpError(`Invalid inputs passed, please try again`, 422));
  }

  await res.json({ status: "ok" });
};

exports.signup = signup;
