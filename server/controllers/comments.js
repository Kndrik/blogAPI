const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Comment = require("../models/comment");
const Article = require("../models/article");

const { passport } = require("./auth");

const checkArticleId = asyncHandler(async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId);
    if (article === null) {
      res.status(400).json({
        message: "Can't find the article in the database.",
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(400).json({
      message: "Article Id not valid",
      err,
    });
  }
});

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

exports.post_comment = [
  body("name", "Name must contain between one and 20 characters")
    .trim()
    .isLength({ min: 1, max: 20 })
    .escape(),
  body("comment", "Your comment must contain between 1 and 100 characters")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(403).json(errors);
    } else {
      next();
    }
  },
  asyncHandler(async (req, res, next) => {
    try {
      const article = await Article.findById(req.params.articleId);
      if (article === null) {
        res.status(400).json({
          message: "Article not found",
        });
      } else {
        const comment = new Comment({
          author: req.body.name,
          content: req.body.comment,
          article: req.params.articleId,
        });
        await comment.save();
        res.json({ message: "Comment successfully created." });
      }
    } catch (err) {
      res.status(400).json({
        message: "There was an error posting the comment",
        err,
      });
    }
  }),
];

exports.edit_comment = [
  passport.authenticate("jwt", { session: false }),
  body("name", "Name must contain between one and 20 characters")
    .trim()
    .isLength({ min: 1, max: 20 })
    .escape(),
  body("comment", "Your comment must contain between 1 and 100 characters")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(403).json(errors);
    } else {
      next();
    }
  },
  checkArticleId,
  asyncHandler(async (req, res) => {
    try {
      const updatedData = {
        author: req.body.name,
        content: req.body.comment,
      };
      await Comment.findByIdAndUpdate(req.params.commentId, updatedData);
      res.json({ message: "Comment successfully updated", updatedData });
    } catch (err) {
      res.status(400).json({
        message: "There was an error editing the comment",
        err,
      });
    }
  }),
];

exports.delete_comment = [
  passport.authenticate("jwt", { session: false }),
  checkArticleId,
  asyncHandler(async (req, res) => {
    try {
      const deleted = await Comment.findByIdAndDelete(req.params.commentId);
      if (deleted === null) {
        res.status(403).json({
          message: `There is no comment with id ${req.params.commentId} in the database`,
        });
      } else {
        res.json({
          message: "Comment successfully deleted",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "There was an error deliting the comment",
        err,
      });
    }
  }),
];
