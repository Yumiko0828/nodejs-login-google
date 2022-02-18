const session = require("express-session");
const passport = require("passport");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

// Inicializations
const app = express();
require("./passport/google");

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "google", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(require("./routes/routes"));

// Server listening
app.listen(app.get("port"), () => {
  console.clear();
  console.log("Server on port:", app.get("port"));
});
