const router = require("express").Router();
const passport = require("passport");
const session = require("express-session");

// auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// auth logout
router.get("/logout", (req, res) => {
  req.logout();
  req.session = null;
  res.redirect("/"); //Inside a callback… bulletproof!
});

//auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

//auth with gitlab
router.get(
  "/gitlab",
  passport.authenticate("gitlab", {
    scope: ["read_user"]
  })
);
router.get(
  "/gitlab/callback",
  passport.authenticate("gitlab", {
    failureRedirect: "/auth/login"
  }),
  (req, res) => {
    // Successful authentication, redirect profile.
    res.redirect("/profile/");
  }
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile/");
});

module.exports = router;
