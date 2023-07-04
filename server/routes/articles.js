const express = require("express");
const router = express.Router();

const articlesController = require("../controllers/articles");

router.get("/", articlesController.get_all_articles);

router.post("/", articlesController.post_article);

router.put("/:articleId", articlesController.update_article);

router.delete("/:articleId", articlesController.delete_article);

module.exports = router;
