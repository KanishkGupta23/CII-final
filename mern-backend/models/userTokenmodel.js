const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const { appconfig } = require("../config/appconfig.js");

const userTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  refreshToken: {
    type: String,
    required: true,
  },
  blackListed: {
    type: Boolean,
    default: false,
  },
});

// Add any additional schema methods or statics here

const UserToken = mongoose.model("UserToken", userTokenSchema);

module.exports = UserToken;