const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth.js");
const Story = require("../models/Story.js");

// home
router.get("/", (req, res) => {
  res.render("home", { layout: "home" });
});

// register
router.get("/register", (req, res) => {
  res.render("register", { layout: "login" });
});
// router.post("/register", (req, res) => {});

// login
router.get("/login", (req, res) => {
  res.render("login", { layout: "login" });
});

//dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("dashboard", { username: req.user.firstName, stories });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
