const User = require("../models/User");
// module.exports = (req, res, next) => {
//   User.findById(req.session.userId, (error, user) => {
//     if (error || !user) return res.redirect("/");
//     next();
//   });
// };

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.redirect("/");
    }

    // If user is found, you can attach the user object to the request for later use in your route handlers
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error in authentication middleware:", error);
    res.status(500).send("Internal Server Error");
  }
};
