const express = require("express");
const router = express.Router();

const articlesController = require("../controllers/articles");

router.get("/", articlesController.get_all_articles);

router.post("/", articlesController.post_article);

module.exports = router;
