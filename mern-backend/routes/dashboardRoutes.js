// routes/industryRoutes.js
const express = require('express');
const { allowedUsers } = require('../middlewares/authMiddleware.js');
const { getDashboardCounts } = require('../controllers/dashboardController'); // Adjust the path as necessary

const router = express.Router();

router.get('/counts',  allowedUsers(['industry']), getDashboardCounts);

module.exports = router;



