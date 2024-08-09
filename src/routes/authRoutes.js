const authRoutes = require("express").Router();
const passport = require("passport");

authRoutes.get("/login", (req, res) => {
  res.render("login");
});
authRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);
authRoutes.get("/google/redirect", (req, res) => {
  res.send("reached the google auth");
});
module.exports = authRoutes;
