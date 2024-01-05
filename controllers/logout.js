module.exports = (req, res) => {
  req.session.destroy(() => {
    console.log("logout pressed!");
    res.redirect("/");
  });
};
