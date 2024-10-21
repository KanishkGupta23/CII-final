const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/handleapplicationController'); // Import the controller

// Apply to a job opening
router.post('/apply/:openingId', applicationController.applyToJob);

// Get all applications for a specific user
router.get('/user/:userId', applicationController.getUserApplications);

// Get details of a specific application
router.get('/:applicationId', applicationController.getApplicationDetails);

module.exports = router;
