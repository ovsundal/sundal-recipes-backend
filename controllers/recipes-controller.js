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
    return next(new HttpError("Could not retrieve recipe", 500));
  }
};

const getRecipes = async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find({}).populate("tags");
    // TODO: only send recipe titles here
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

  const { recipe, recipeTitle, recipeTags } = req.body;
  const sanitizedRecipe = sanitize(recipe);
  const sanitizedRecipeTitle = sanitize(recipeTitle);
  // TODO: sanitize tags in both add and updateRecipe
  const createdRecipe = new Recipe({
    recipe: sanitizedRecipe,
    title: sanitizedRecipeTitle,
    tags: recipeTags
  });

  try {
    await createdRecipe.save();
  } catch (e) {
    return next(new HttpError("Could not add recipe", 500));
  }

  await res.status(201).json({ recipe });
};

const updateRecipe = async (req, res, next) => {
  const errors = validationResult(req);

  // body input error
  if (!errors.isEmpty()) {
    return next(new HttpError(`Invalid inputs passed, please try again`, 422));
  }

  const { recipe, recipeTitle, recipeId, recipeTags } = req.body;

  const sanitizedRecipe = sanitize(recipe);
  const sanitizedRecipeTitle = sanitize(recipeTitle);
  const sanitizedRecipeId = sanitize(recipeId);

  try {
    await Recipe.findByIdAndUpdate(sanitizedRecipeId, {
      recipe: sanitizedRecipe,
      title: sanitizedRecipeTitle,
      tags: recipeTags
    });
  } catch (e) {
    console.log(e);
    return next(new HttpError("Could not update recipe", 500));
  }
};

exports.addRecipe = addRecipe;
exports.getRecipes = getRecipes;
exports.getRecipe = getRecipe;
exports.updateRecipe = updateRecipe;
