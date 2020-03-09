const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  ingredients: { type: Array, required: true },
  instructions: { type: String }
});

module.exports = mongoose.model("Recipe", recipeSchema);
