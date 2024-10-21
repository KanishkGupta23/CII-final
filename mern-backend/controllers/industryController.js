const Industry = require('../models/Industry'); // Correctly import the Industry model
const mongoose = require('mongoose');

// Create a new industry
const createIndustry = async (req, res) => {
    const {
        user,
        name,
        description,
        logo,
        registration_date,
        estb_year,
        cii_id,
        website,
        contact_num,
        email_id,
        address,
        city,
        state,
        pincode,
        country,
        verified,
        domain,
    } = req.body;

    try {
        const newIndustry = new Industry({
            user,
            name,
            description,
            logo,
            registration_date: registration_date ? new Date(registration_date) : null,
            estb_year: estb_year ? new Date(estb_year) : null,
            cii_id,
            website,
            contact_num,
            email_id,
            address,
            city,
            state,
            pincode,
            country,
            verified,
            domain,
        });

        await newIndustry.save();
        return res.status(201).json({ success: true, data: newIndustry });
    } catch (error) {
        console.error('Error creating industry:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Register an industry
const registerIndustry = async (req, res) => {
    const { name, description, email_id, address, city, registration_date, estb_year, country } = req.body;

    try {
        const newIndustry = new Industry({  // Change Industries to Industry
            name,
            description,
            email_id,
            address,
            city,
            registration_date,
            estb_year,
            country
        });

        await newIndustry.save();
        res.status(201).json({ message: 'Industry registered successfully', data: newIndustry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering industry', error });
    }
};

// Get all industries
const getAllIndustries = async (req, res) => {
    try {
        const industries = await Industry.find();
        return res.status(200).json({ success: true, data: industries });
    } catch (error) {
        console.error('Error fetching industries:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get a single industry by ID
const getIndustryById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid industry ID' });
    }

    try {
        const industry = await Industry.findById(id);

        if (!industry) {
            return res.status(404).json({ success: false, message: 'Industry not found' });
        }

        return res.status(200).json({ success: true, data: industry });
    } catch (error) {
        console.error('Error fetching industry:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update an industry by ID
const updateIndustry = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid industry ID' });
    }

    try {
        const updatedIndustry = await Industry.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedIndustry) {
            return res.status(404).json({ success: false, message: 'Industry not found' });
        }

        return res.status(200).json({ success: true, data: updatedIndustry });
    } catch (error) {
        console.error('Error updating industry:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete an industry by ID
const deleteIndustry = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid industry ID' });
    }

    try {
        const deletedIndustry = await Industry.findByIdAndDelete(id);

        if (!deletedIndustry) {
            return res.status(404).json({ success: false, message: 'Industry not found' });
        }

        return res.status(200).json({ success: true, data: deletedIndustry });
    } catch (error) {
        console.error('Error deleting industry:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Export all functions together
module.exports = {
    createIndustry,
    registerIndustry,
    getAllIndustries,
    getIndustryById,
    updateIndustry,
    deleteIndustry,
};
