// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
const { promisify } = require('util');

// Unauthenticated User Middleware
const unauthenticatedUser = (req, res, next) => {
    if (req.user) {
        return res.redirect('/'); // Replace with the actual route for index
    }
    next();
};

// Allowed Users Middleware
const allowedUsers = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            // Retrieve the token from the Authorization header
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                console.log('No token provided.');
                return res.status(403).send('Access denied.');
            }

            console.log(token);

            // Verify the token
            const decoded = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN_KEY);
            console.log(decoded);
            // Use decoded.id to find the user
            const user = await User.findById(decoded._id); // Retrieve the user from the database

            if (!user) {
                console.log('User not found with ID:', decoded.id);
                return res.status(403).send('Access denied.');
            }

            // Role check
            const userType = user.userType; // Get the user's role
            console.log('User type:', userType);

            // Check if the user's role is in the allowed roles
            if (allowedRoles.includes(userType)) {
                req.user = user; // Attach the user to the request object
                next();
            } else {
                console.log('User type not authorized:', userType);
                return res.status(403).send('You are not authorized to view this page.');
            }
        } catch (err) {
            console.error('Error verifying token:', err);
            return res.status(500).send('Server error.');
        }
    };
};

module.exports = { unauthenticatedUser, allowedUsers };
