const authRoutes = require("express").Router();
authRoutes.get("/login/", (req, res) => {
  res.send("login");
});
module.exports = authRoutes;
