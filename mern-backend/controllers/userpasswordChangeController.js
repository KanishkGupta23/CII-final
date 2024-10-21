const bcrypt = require("bcrypt");
const UserModel = require("../models/User.js");
const { hashPassword } = require("../utils/hashPassword.js");

const userPasswordChangeController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid user",
      });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while changing the password",
    });
  }
};

module.exports = userPasswordChangeController;