const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/login", authController.login_post);

router.post("/signup", authController.signup_post);

router.post("/check", authController.jwt_check);

module.exports = router;
