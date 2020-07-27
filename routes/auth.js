const express = require("express");
const passport = require("passport");
const router = express.Router();

// auth with google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// auth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.render("dashboard", { userName: req.user.firstName });
  }
);

// auth with facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

// auth facebook callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.render("dashboard", { userName: req.user.firstName });
  }
);

// logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
