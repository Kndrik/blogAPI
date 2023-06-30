const { DateTime } = require("luxon");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentModel = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  date: { type: Date, default: Date.now },
  article: { type: Schema.Types.ObjectId, ref: "Article" },
});

CommentModel.virtual("date_formatted").get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Comment", CommentModel);
