const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema({
  email: String,
  password: String,
  first_name: String,
  last_name: String,
});

module.exports = mongoose.model("User", UserModel);
