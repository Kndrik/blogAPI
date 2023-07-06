const { DateTime } = require("luxon");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
  published: Boolean,
});

ArticleSchema.virtual("date_formatted").get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

ArticleSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Article", ArticleSchema);
