// routes/instituteDashboardRoutes.js
const express = require('express');
const { getInstituteStatistics } = require('../controllers/instituteDashboardController');
const { allowedUsers } = require('../middlewares/authMiddleware'); // Your existing middleware

const router = express.Router();

// Route to get statistics for the logged-in institute
router.get('/statistics', allowedUsers(['institute']), getInstituteStatistics);

module.exports = router;
