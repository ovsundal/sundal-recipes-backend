const sanitize = require("sanitize-html");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Recipe = require("../models/recipes-model");

const getRecipe = async (req, res, next) => {
  try {
    const { id } = req.query;
    const sanitizedId = sanitize(id);

    const recipe = await Recipe.find({ _id: sanitizedId });

    res.json({
      recipes: recipe.map(recipe => recipe.toObject({ getters: true }))
    });
  } catch (e) {
    return next(new HttpError("Could not retrieve recipes", 500));
  }
};

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

  const { recipe, recipeTitle } = req.body;
  const sanitizedRecipe = sanitize(recipe);

  const createdRecipe = new Recipe({
    recipe: sanitizedRecipe,
    title: recipeTitle
  });

  try {
    await createdRecipe.save();
  } catch (e) {
    return next(new HttpError("Could not add recipe", 500));
  }

  await res.status(201).json({ recipe });
};

exports.addRecipe = addRecipe;
exports.getRecipes = getRecipes;
exports.getRecipe = getRecipe;
