const express = require('express');
const router = express.Router();
const openingController = require('../controllers/openingsController.js');

// Define routes with correct controller methods
router.get('/openings', openingController.getAllOpenings);
router.post('/create', openingController.createOpening);
router.get('/openings/:id', openingController.getOpeningById);
router.put('/openings/:id', openingController.updateOpening);
router.delete('/openings/:id', openingController.deleteOpening);

module.exports = router;
