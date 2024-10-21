const Event = require('../models/Event');
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Create a new event
exports.createEvent = async (req, res) => {
    try {
        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            }

            const event = new Event({
                name: req.body.name,
                description: req.body.description,
                date: req.body.date,
                time: req.body.time,
                image: result.secure_url,
                user: req.user._id // Associate event with logged-in user
            });

            event.save()
                .then(() => res.status(201).json(event))
                .catch(err => res.status(400).json({ message: err.message }));
        }).end(req.file.buffer); // Upload the file from the buffer
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all events for the logged-in user
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({ user: req.user._id }); // Fetch events only for the logged-in user
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an event
exports.updateEvent = async (req, res) => {
    try {
        const updatedData = { ...req.body };

        // Check if a new image was uploaded
        if (req.file) {
            const result = await cloudinary.uploader.upload_stream((error, result) => {
                if (error) {
                    return res.status(500).json({ message: error.message });
                }

                updatedData.image = result.secure_url; // Update the image URL
            }).end(req.file.buffer); // Upload the file from the buffer
        }

        const event = await Event.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id }, // Ensure the user is the owner
            updatedData,
            { new: true }
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found or not authorized.' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findOneAndDelete({ _id: req.params.id, user: req.user._id }); // Ensure the user is the owner

        if (!event) {
            return res.status(404).json({ message: 'Event not found or not authorized.' });
        }

        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};