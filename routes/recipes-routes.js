const express = require("express");
const recipesController = require("../controllers/recipes-controller");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/getRecipes", recipesController.getRecipes);
router.get("/getRecipe", recipesController.getRecipe);

// routes below this requires token verification
// router.use(checkAuth);

router.post(
  "/addRecipe",
  [check("recipe").notEmpty()],
  recipesController.addRecipe
);

module.exports = router;
