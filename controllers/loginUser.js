const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username in the database
    const user = await User.findOne({ username });

    if (user) {
      // If user is found, compare passwords
      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (passwordsMatch) {
        // Passwords match, successful login
        // Store user session (not implemented in this code snippet)
        req.session.userId = user._id;
        return res.redirect("/");
      }
    }

    // User not found or passwords don't match, redirect to login page
    return res.redirect("/auth/login");
  } catch (error) {
    // Handle errors, e.g., log them or send an error response
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
};
