const express = require('express');
const { submitApplication } = require('../controllers/studentController');
const { allowedUsers } = require('../middlewares/authMiddleware'); // Middleware to check if the user is a student

const router = express.Router();

// Route to submit application
router.post('/apply', allowedUsers(['student']), submitApplication);

module.exports = router;
