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
    return res.render("dashboard");
  } catch (err) {
    console.error(err);
    return res.render("errors/500");
  }
});

// show all stories "get" request
router.get("/", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .lean();
    res.render("stories/index", { stories });
  } catch (err) {
    console.error(err);
    res.render("errors/500");
  }
});

// "get" request for a story by id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();
    if (!story) {
      return res.render("errors/404");
    }
    return res.render("stories/story", {
      story: story,
      title: story.title,
      body: story.body,
    });
  } catch (err) {
    console.error(err);
    return res.render("errors/500");
  }
});

// Delete story/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Story.deleteOne({ _id: req.params.id });
    res.render("dashboard");
  } catch (err) {
    console.error(err);
    res.render("errors/500");
  }
});

module.exports = router;
