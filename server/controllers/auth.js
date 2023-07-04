const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const passport = require("passport");
const jwtStrategy = require("../strategies/jwt");
passport.use(jwtStrategy);

exports.passport = passport;

const User = require("../models/user");

const { body, validationResult } = require("express-validator");

exports.login_post = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email }).exec();

    if (!existingUser) {
      return res.status(401).json({ message: "Auth failed" });
    }

    // Check in db for email and password
    bcrypt.compare(password, existingUser.password, function (err, result) {
      if (result) {
        const opts = {
          expiresIn: 86400,
        };
        const secret = process.env.SECRET_KEY;
        const token = jwt.sign({ email }, secret, opts);
        return res.status(200).json({
          token,
        });
      } else {
        return res.status(401).json({ message: "Wrong password" });
      }
    });
  } catch (err) {
    res.status(401).json({ message: "Auth failed" });
  }
});

exports.signup_post = [
  body("email", "Email must not be empty").trim().isLength({ min: 1 }).escape(),
  body("email").custom(async (email) => {
    const existingUser = await User.findOne({ email: email }).exec();

    if (existingUser) {
      throw new Error("An account with this username already exists.");
    }
  }),
  body("first_name", "First name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "Last name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must contain between 8 and 20 characters")
    .isLength({ min: 8, max: 20 })
    .escape(),
  body("password_confirm", "Passwords do not match").custom(
    (value, { req }) => value === req.body.password
  ),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(401).json({
        message: "Sign up failed",
        errors,
      });
    } else {
      next();
    }
  }),
  asyncHandler(async (req, res, next) => {
    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        } else {
          const user = new User({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hashedPassword,
          });
          await user.save();
          res.json({
            message: "Account created",
          });
        }
      });
    } catch (err) {
      res.status(401).json({
        message: "Sign up failed. Password hashing error.",
      });
    }
  }),
];
