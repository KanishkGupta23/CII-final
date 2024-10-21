const express = require('express');
const router = express.Router();
const instituteController = require('../controllers/instituteController');

// Create a new institute
router.post('/institute/create', instituteController.createInstitute);

// Get all institutes
router.get('/institutes', instituteController.getAllInstitutes);

// Get a single institute by ID
router.get('/institute/:id', instituteController.getInstituteById);

// Update an institute
router.put('/institute/:id', instituteController.updateInstitute);

// Delete an institute
router.delete('/institute/:id', instituteController.deleteInstitute);

module.exports = router;
