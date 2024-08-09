const authRoutes = require("express").Router();
authRoutes.get("/login/", (req, res) => {
  res.render("login");
});
module.exports = authRoutes;
