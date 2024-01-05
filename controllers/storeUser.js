const User = require("./../models/User");
const path = require("path");
const flash = require("connect-flash");

module.exports = async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  await User.create(user)
    .then((user) => {
      res.redirect("/");
    })
    .catch((error) => {
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      req.flash("validationErrors", validationErrors);

      res.render("register", {
        errors: flash("validationErrors"),
      });
    });
};
