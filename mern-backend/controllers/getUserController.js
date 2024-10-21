const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getUserController = async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Use optional chaining

  if (!token) {
    return res.status(401).send("Authorization token is required.");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    // Find the user by ID and exclude the password field
    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Log the user information for debugging
    // console.log(user);
    
    // Send the user data as response
    res.json(user);
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).send("Invalid token");
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).send("Token has expired");
    }
    res.status(500).send("Server error");
  }
};

module.exports = getUserController;
