const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tagsSchema = new Schema({
  tags: { type: Array }
});

module.exports = mongoose.model("Tags", tagsSchema);
