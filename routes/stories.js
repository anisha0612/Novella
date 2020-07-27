const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth.js");
const Story = require("../models/Story.js");

// add page "GET" req
router.get("/add", ensureAuth, (req, res) => {
  return res.render("stories/add", { username: req.user.firstName });
});

// add page "Post" req
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    return res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    return res.render("errors/500");
  }
});

module.exports = router;
