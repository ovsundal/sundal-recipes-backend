const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tagsSchema = new Schema({
  name: { type: String }
});

module.exports = mongoose.model("Tags", tagsSchema);
