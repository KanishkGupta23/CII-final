const express = require('express');
const router = express.Router();
const industryController = require('../controllers/industryController'); // Ensure this path is correct

// Define your routes
router.post('/create', industryController.createIndustry);
router.post('/register', industryController.registerIndustry);
router.get('/', industryController.getAllIndustries);
router.get('/:id', industryController.getIndustryById);
router.put('/:id', industryController.updateIndustry);
router.delete('/:id', industryController.deleteIndustry);

module.exports = router;
