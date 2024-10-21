const Institute = require('../models/Institute');

// Create a new institute
exports.createInstitute = async (req, res) => {
    try {
        const institute = new Institute(req.body);
        await institute.save();
        res.status(201).json({ success: true, institute });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all institutes
exports.getAllInstitutes = async (req, res) => {
    try {
        const institutes = await Institute.find();
        res.status(200).json({ success: true, institutes });
    } catch (error) {
        console.error('Server Error:', error); // Log error for debugging
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get a single institute by ID
exports.getInstituteById = async (req, res) => {
    try {
        const institute = await Institute.findById(req.params.id);
        if (!institute) {
            return res.status(404).json({ success: false, message: 'Institute not found' });
        }
        res.status(200).json({ success: true, institute });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update an institute
exports.updateInstitute = async (req, res) => {
    try {
        const institute = await Institute.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!institute) {
            return res.status(404).json({ success: false, message: 'Institute not found' });
        }
        res.status(200).json({ success: true, institute });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete an institute
exports.deleteInstitute = async (req, res) => {
    try {
        const institute = await Institute.findByIdAndDelete(req.params.id);
        if (!institute) {
            return res.status(404).json({ success: false, message: 'Institute not found' });
        }
        res.status(204).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
