const mongoose = require('mongoose');
const Application = require('../models/Application'); // Application model
const User = require('../models/User'); // User model
const Opening = require('../models/Opening'); // Openings model
const Institutes = require('../models/Institute'); // Institutes model

// Get all applications
exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .populate('user', 'username email') // Populate user details
            .populate('openings') // Populate openings details
            .populate('institute'); // Populate institute details

        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: 'No applications found.' });
        }

        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a single application by ID
exports.getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('user', 'fullname email') // Populate user details
            .populate('openings') // Populate openings details
            .populate('institute'); // Populate institute details

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json(application);
    } catch (error) {
        console.error('Error fetching application:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Create a new application
exports.createApplication = async (req, res) => {
    try {
        const { userId, openingId, instituteId, application_date } = req.body;

        // Check if user, opening, and institute exist
        const user = await User.findById(userId);
        const opening = await Opening.findById(openingId);
        const institute = await Institutes.findById(instituteId);

        if (!user || !opening || !institute) {
            return res.status(404).json({ message: 'User, Opening, or Institute not found' });
        }

        // Create a new application
        const application = new Application({
            user: userId,
            openings: openingId,
            institute: instituteId,
            application_date: application_date ? new Date(application_date) : new Date(), // Use provided date or current date
        });

        await application.save();
        res.status(201).json(application);
    } catch (error) {
        console.error('Error creating application:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update an application by ID
exports.updateApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('user', 'fullname email') // Populate user details
            .populate('openings') // Populate openings details
            .populate('institute'); // Populate institute details

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json(application);
    } catch (error) {
        console.error('Error updating application:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete an application by ID
exports.deleteApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(204).json({ message: 'Application deleted successfully' });
    } catch (error) {
        console.error('Error deleting application:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
