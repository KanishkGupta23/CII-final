const express = require('express');
const router = express.Router();
const {
    getApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
} = require('../controllers/applicationController');

// Define routes
router.get('/', getApplications);
router.get('/:id', getApplicationById);
router.post('/create', createApplication);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;
