const passport = require("passport");
const jwt = require("jsonwebtoken");
const { appconfig } = require("../config/appconfig.js");

const userloginController = async (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        status: "failed",
        message: info.message || "Login failed.",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id}, appconfig.ACCESS_TOKEN_KEY, {
      expiresIn: "1h",
    });

    // Set isAuthenticated to true
    user.isAuthenticated = true;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "User login successful",
      user: {
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        userType: user.userType,

      },
      token,
    });
  })(req, res, next);
};


// Export the controller directly
module.exports = userloginController; 
