// main/mainRoutes.js
const express = require('express');
const mainController = require('./mainController');
const router = express.Router();

// Define routes for the main app
router.use('/', mainController);

module.exports = router;
