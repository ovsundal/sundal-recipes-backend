const express = require("express");
const recipesController = require("../controllers/recipes-controller");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/addRecipe",
  [check("title").notEmpty(), check("ingredients").notEmpty()],
  recipesController.addRecipe
);

module.exports = router;
