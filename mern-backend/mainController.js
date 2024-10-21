// main/mainController.js
const express = require('express');
const router = express.Router();

// Example route for main app
router.get('/', (req, res) => {
   res.send('Welcome to the Main App!');
});

// More routes can be added here as needed
module.exports = router;
