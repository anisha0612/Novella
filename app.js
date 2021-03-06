const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/db.js");

// Load config
dotenv.config({ path: "./config/config.env" });
// passport-google config
require("./config/passportGoogle.js")(passport);
require("./config/passportFacebook.js")(passport);
require("./config/passportLocal.js")(passport);
// import {} from "./config/passportGoogle.js";

connectDB();

const app = express();
app.use(cookieParser());

// static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// morgan - dev mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// handlebar helpers
const { formatDate, truncate, stripTags } = require("./helpers/hbs.js");

// handlebars middleware

app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    partialsDir: [path.resolve(), "views/partials"],
    helpers: {
      formatDate,
      truncate,
      stripTags,
    },
  })
);
app.set("view engine", ".hbs");

// session middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// set global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// routes
app.use("/", require("./routes/index.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/stories", require("./routes/stories.js"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
