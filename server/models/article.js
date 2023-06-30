const { DateTime } = require("luxon");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
});

ArticleSchema.virtual("date_formatted").get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Article", ArticleSchema);
