// routes/dashboard.js
const express = require('express');
const authMiddleware = require('../middlewares/auth.js');
const Opening = require('../models/Opening'); // Create an Opening model for internships

const router = express.Router();

// Get dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {
    // Fetch and return dashboard data based on user role
    const openings = await Opening.find(); // Add logic to filter based on user role
    res.json(openings);
});

// Manage internship
router.post('/internship', authMiddleware, async (req, res) => {
    const { jobTitle, description } = req.body; // Example fields
    const newOpening = new Opening({ jobTitle, description });
    await newOpening.save();
    res.status(201).json(newOpening);
});

module.exports = router;
