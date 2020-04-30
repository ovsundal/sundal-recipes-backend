const sanitize = require("sanitize-html");
const Tags = require("../models/tags-model");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

const getTags = async (req, res, next) => {
  try {
    const tags = await Tags.find({});

    res.json({
      tags: tags.map(tags => tags.toObject({ getters: true }))
    });
  } catch (e) {
    return next(new HttpError("Could not retrieve tags", 500));
  }
};

const addTags = async (req, res, next) => {
  const errors = validationResult(req);

  // body input error
  if (!errors.isEmpty()) {
    return next(new HttpError(`Invalid inputs passed, please try again`, 422));
  }

  const { name } = req.body;
  const sanitizedName = sanitize(name);
  const createdTags = new Tags({
    name: sanitizedName
  });

  try {
    await createdTags.save();
  } catch (e) {
    return next(new HttpError("Could not add tags", 500));
  }

  await res.status(201).json({ name });
};

exports.addTags = addTags;
exports.getTags = getTags;
