const asyncHandler = require("express-async-handler");
const Article = require("../models/article");

const { body, validationResult } = require("express-validator");

const passport = require("passport");
const jwtStrategy = require("../strategies/jwt");
passport.use(jwtStrategy);

exports.get_all_articles = asyncHandler(async (req, res) => {
  try {
    const allArticles = await Article.find({}).exec();
    res.json(allArticles);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve articles from the database." });
  }
});

exports.post_article = [
  passport.authenticate("jwt", { session: false }),
  body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
  body("content", "Content must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("published", "Published must be a boolean value").isBoolean().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors
      res.status(403).json({ message: "Post failed", errors });
    } else {
      next();
    }
  }),
  asyncHandler(async (req, res) => {
    try {
      const article = new Article({
        author: req.user,
        title: req.body.title,
        content: req.body.content,
        published: req.body.published,
      });
      await article.save();
      return res.status(200).json({
        message: "Successfully created a post on a protected Route.",
      });
    } catch (err) {
      return res.status(500).json({
        message: "There was an error adding the article to the database.",
        err,
      });
    }
  }),
];

exports.update_article = [
  body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
  body("content", "Content must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("published", "Published must be a boolean value").isBoolean().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors
      res.status(403).json({ message: "Update failed", errors });
    } else {
      next();
    }
  }),
  asyncHandler(async (req, res, next) => {
    try {
      const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        published: req.body.published,
      };
      await Article.findByIdAndUpdate(req.params.articleId, updatedPost);
      res.json({ message: "Successfully updated the article" });
    } catch (err) {
      res.status(500).json({
        message: `Couldn't find or update article ${req.params.articleId} in the database`,
        err,
      });
    }
  }),
];
