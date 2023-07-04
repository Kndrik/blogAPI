const express = require("express");
const router = express.Router({ mergeParams: true });
const commentsController = require("../controllers/comments");

router.get("/", commentsController.get_comments);

router.post("/", commentsController.post_comment);

router.put("/:commentId", commentsController.edit_comment);

router.delete("/:commentId", commentsController.delete_comment);

module.exports = router;
