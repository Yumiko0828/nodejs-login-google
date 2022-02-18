const router = require("express").Router();
const passport = require("passport");

/* Routes */
router.get("/", (req, res) => {
    const user = req.user;
    if (!user) {
        res.send("<a href='/auth/google'>Login</a>")
    } else {
        res.send("<p>" + user.displayName + "</p>")
    }
})

// Auth with Google
router.get("/auth", (req, res) => {
  res.redirect("/auth/google");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/userjson",
    failureRedirect: "/auth/google",
  })
);

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/userjson", isAuth, (req, res) => {
  res.json({ user: req.user });
});

// Filter
function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/auth/google");
}

module.exports = router;
