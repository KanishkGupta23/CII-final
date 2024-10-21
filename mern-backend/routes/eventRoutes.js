const express = require('express');
const multer = require('multer');
const { createEvent, getAllEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const { allowedUsers } = require('../middlewares/authMiddleware');

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Create a router
const router = express.Router();

// Define the routes with authentication middleware
router.post('/', allowedUsers(['industry']), upload.single('image'), createEvent); // Allow admin and user roles to create events
router.get('/', allowedUsers(['industry']), getAllEvents); // Allow admin and user roles to get events
router.put('/:id', allowedUsers(['industry']), upload.single('image'), updateEvent); // Allow admin and user roles to update events
router.delete('/:id', allowedUsers(['industry']), deleteEvent); // Allow admin and user roles to delete events

module.exports = router;