// // routes/auth.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const router = express.Router();

// // Register
// router.post('/register', async (req, res) => {
//     const { username, email, password, role } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//         username,
//         email,
//         password: hashedPassword,
//         role,
//     });

//     try {
//         await newUser.save();
//         res.status(201).send('User registered successfully');
//     } catch (error) {
//         res.status(400).send('Error registering user');
//     }
// });

// // Login
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     const user = await User.findOne({ username });
//     if (!user) {
//         return res.status(400).send('Invalid username or password');
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         return res.status(400).send('Invalid username or password');
//     }

//     const token = jwt.sign({ id: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
//     res.json({ token });
// });

// module.exports = router;
