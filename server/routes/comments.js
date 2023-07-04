const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.send(
    `Get comments from article ${req.params.articleId}. Not implemented yet`
  );
});

router.post("/", (req, res) => {
  res.send(
    `Create comment under article ${req.params.articleId}. Not implemented yet`
  );
});

router.put("/:commentId", (req, res) => {
  res.send(`Update comment ${req.params.commentId}. Not implemented yet`);
});

router.delete("/:commentId", (req, res) => {
  res.send(`Delete comment ${req.params.commentId}. Not implemented yet`);
});

module.exports = router;
