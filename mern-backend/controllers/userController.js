// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login Page
exports.loginPage = async (req, res) => {
    const { email, password } = req.body;

    try {
        // User ko email se dhoondhe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Password ko check karein
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // JWT token generate karein
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Admin Page
exports.adminPage = (req, res) => {
    res.send('Admin Page - Access Granted');
};
// User Signup
exports.signupPage = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Password hash karein
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Naya user banayein
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};


// Get User by JWT
