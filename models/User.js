const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  profileId: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
