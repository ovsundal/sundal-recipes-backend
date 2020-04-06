const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  recipe: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Recipe", recipeSchema);
