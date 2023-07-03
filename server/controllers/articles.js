const asyncHandler = require("express-async-handler");
const Article = require("../models/article");

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
  (req, res) => {
    return res
      .status(200)
      .json({ message: "Successfully created a post on a protected Route." });
  },
];
