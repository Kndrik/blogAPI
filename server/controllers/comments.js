const asyncHandler = require("express-async-handler");

const Comment = require("../models/comment");

exports.get_comments = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({ article: req.params.articleId });
    res.json(comments);
  } catch (err) {
    res.json({
      message: `There was an error getting comments for article ${req.params.articleId}`,
      err,
    });
  }
});
