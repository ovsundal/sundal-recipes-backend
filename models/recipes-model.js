const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  recipe: { type: String, required: true, unique: true },
  title: { type: String, required: true }
});

module.exports = mongoose.model("Recipe", recipeSchema);
