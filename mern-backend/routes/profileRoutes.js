const express = require('express');
const { updateProfile } = require('../controllers/profileController'); // Adjust the path as needed

const router = express.Router();

// Route to update a profile
router.put('/profiles/:id', updateProfile);

module.exports = router;
