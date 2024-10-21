// controllers/openingController.js
const mongoose = require('mongoose');
const Opening = require('../models/Opening.js');

// Create a new job opening
exports.createOpening = async (req, res) => {
    const {
        job_title,
        description,
        key_skills,
        opening_date,
        city,
        state,
        stipend,
        past_experience_required,
        industry,
        apply_by,
    } = req.body;

    // Validate required fields
    if (!job_title || !description || !stipend || !industry || !apply_by || !opening_date) {
        return res.status(400).json({ success: false, message: 'Please fill all required fields' });
    }

    // Validate industry ID
    if (!mongoose.Types.ObjectId.isValid(industry)) {
        return res.status(400).json({ success: false, message: 'Invalid industry ID' });
    }

    try {
        const newOpening = new Opening({
            job_title,
            description,
            key_skills,
            opening_date: new Date(opening_date),
            city,
            state,
            stipend,
            past_experience_required: past_experience_required === 'true',
            industry: new mongoose.Types.ObjectId(industry),
            apply_by: new Date(apply_by),
        });

        await newOpening.save();
        return res.status(201).json({ success: true, data: newOpening });
    } catch (error) {
        console.error('Error creating job opening:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: 'Validation error', details: error.errors });
        }
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

// Get all job openings
exports.getAllOpenings = async (req, res) => {
    try {
        const openings = await Opening.find().populate('industry', 'name');  // Assuming industry has a name field
        return res.status(200).json({ success: true, data: openings });
    } catch (error) {
        console.error('Error fetching job openings:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

// Get a single job opening by ID
exports.getOpeningById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid opening ID' });
    }

    try {
        const opening = await Opening.findById(id).populate('industry', 'name');
        if (!opening) {
            return res.status(404).json({ success: false, message: 'Opening not found' });
        }
        return res.status(200).json({ success: true, data: opening });
    } catch (error) {
        console.error('Error fetching job opening:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

// Update a job opening by ID
exports.updateOpening = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid opening ID' });
    }

    if (updateData.industry && !mongoose.Types.ObjectId.isValid(updateData.industry)) {
        return res.status(400).json({ success: false, message: 'Invalid industry ID' });
    }

    try {
        const updatedOpening = await Opening.findByIdAndUpdate(id, updateData, { new: true }).populate('industry', 'name');
        if (!updatedOpening) {
            return res.status(404).json({ success: false, message: 'Opening not found' });
        }
        return res.status(200).json({ success: true, data: updatedOpening });
    } catch (error) {
        console.error('Error updating job opening:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: 'Validation error', details: error.errors });
        }
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

// Delete a job opening by ID
exports.deleteOpening = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid opening ID' });
    }

    try {
        const deletedOpening = await Opening.findByIdAndDelete(id);
        if (!deletedOpening) {
            return res.status(404).json({ success: false, message: 'Opening not found' });
        }
        return res.status(200).json({ success: true, message: 'Job opening deleted successfully' });
    } catch (error) {
        console.error('Error deleting job opening:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};
