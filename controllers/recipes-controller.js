const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Recipe = require("../models/recipes-model");

const getRecipes = async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find({});

    res.json({
      recipes: allRecipes.map(recipe => recipe.toObject({ getters: true }))
    });
  } catch (e) {
    return next(new HttpError("Could not retrieve recipes", 500));
  }
};

const addRecipe = async (req, res, next) => {
  const errors = validationResult(req);

  // body input error
  if (!errors.isEmpty()) {
    return next(new HttpError(`Invalid inputs passed, please try again`, 422));
  }

  const { title, ingredients, instructions } = req.body;

  const createdRecipe = new Recipe({
    title,
    ingredients,
    instructions
  });

  try {
    await createdRecipe.save();
  } catch (e) {
    return next(new HttpError("Could not add recipe", 500));
  }

  await res.status(201).json({ title, ingredients, instructions });
};

exports.addRecipe = addRecipe;
exports.getRecipe = getRecipes;
