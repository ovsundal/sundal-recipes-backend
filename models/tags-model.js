const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tagsSchema = new Schema({
  tags: { type: String }
});

module.exports = mongoose.model("Tags", tagsSchema);
