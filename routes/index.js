const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth.js");
const passport = require("passport");
const bcrypt = require("bcrypt");
const Story = require("../models/Story.js");
const User = require("../models/User.js");
const { passwordValidate } = require("../config/passwordValidate.js");

// home
router.get("/", (req, res) => {
  res.render("home", { layout: "home" });
});

// register
router.get("/register", (req, res) => {
  res.render("register", { layout: "login" });
});

// register "post" request
router.post("/register", async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    let errors = [];
    errors = passwordValidate(firstName, lastName, email, password);
    if (errors.length > 0) {
      return res.render("register", { errors: errors, layout: "login" });
    } else {
      User.findOne({ email: email }).then((user) => {
        if (user) {
          errors.push({ msg: "Email is already registered" });
          return res.render("register", { errors: errors, layout: "login" });
        } else {
          const user = new User(req.body);
          bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) {
                return res.redirect("register", { layout: "login" });
              } else {
                user.password = hash;
                user.save();
                req.flash(
                  "success_msg",
                  "You have been registered, you can now log in"
                );
                return res.render("login", { layout: "login" });
              }
            });
          });
        }
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// login
router.get("/login", (req, res) => {
  res.render("login", { layout: "login" });
});

//login "post" request
router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

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
