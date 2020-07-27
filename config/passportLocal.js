const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User.js");

// const LocalStrategy = local.Strategy;
module.exports = (passport) => {
  passport.use(
    "local-login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        console.log(email);
        //Match user
        User.findOne({ email: email })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: "The email is not registered",
              });
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Password incorrect" });
              }
            });
          })
          .catch((err) => console.log(err));
      }
    )
  );

  // passport.use(User.createStrategy());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
