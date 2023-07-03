require("dotenv").config();

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
const User = require("../models/user");

module.exports = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await User.findOne({ email: jwt_payload.email }).exec();
    if (!user) {
      return done(null, false, {
        message: "No user found with the payload's email.",
      });
    } else {
      return done(null, user);
    }
  } catch (err) {
    done(err);
  }
});
