const Institute = require('../models/Institute');
const StudentProfileModel = require('../models/StudentProfileModel');
const Application = require('../models/Application');
const Opening = require('../models/Opening'); // Import the Opening model
const User = require('../models/User');
const mongoose = require('mongoose');

exports.getInstituteStatistics = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user info is attached to req.user after authentication
        console.log('User ID:', userId);
        
        // Find the institute associated with the user
        const institute = await Institute.findOne({ user: userId });
        if (!institute) {
            return res.status(404).json({ message: 'Institute not found.' });
        }

        const instituteId = institute._id; // Get the ObjectId
        const instituteName = institute.name; // Get the institute name
        
        console.log('Institute ID:', instituteId);
        console.log('Institute Name:', instituteName);

        // Fetch statistics for the logged-in user's institute
        // Count documents where institute field matches the ObjectId
        const totalStudents = await StudentProfileModel.countDocuments({ 
            institute: instituteId // Use the ObjectId directly
        });

        const totalApplications = await Application.countDocuments({ 
            institute: instituteId // Also ensure this is the ObjectId
        });

        // Retrieve all job openings
        const allOpenings = await Opening.find(); // Fetch all openings

        res.status(200).json({
            totalStudents,
            totalApplications,
            totalOpenings: allOpenings.length, // Total count of openings
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ message: `Error fetching statistics: ${error.message}` });
    }
};
