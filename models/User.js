const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  profileId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);