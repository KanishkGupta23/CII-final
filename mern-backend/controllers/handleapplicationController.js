const Application = require('../models/Application'); // Import the Application model
const Opening = require('../models/Opening'); // Import the Opening model
const User = require('../models/User'); // Import the User model

// Apply to a job opening
exports.applyToJob = async (req, res) => {
  const { userId } = req.body; // Extract userId from request body

  try {
    // Check if the job opening exists
    const opening = await Opening.findById(req.params.openingId);
    if (!opening) {
      return res.status(404).json({ message: 'Job opening not found' });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has already applied for this opening
    const existingApplication = await Application.findOne({
      user: userId,
      opening: req.params.openingId,
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this opening' });
    }

    // Create a new application
    const application = new Application({
      user: userId,
      opening: req.params.openingId,
    });

    // Save the application to the database
    await application.save();

    return res.status(201).json({ message: 'Successfully applied for the job!' });
  } catch (error) {
    console.error('Error applying for job:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all applications for a specific user
exports.getUserApplications = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find applications by user ID
    const applications = await Application.find({ user: userId })
      .populate('opening') // Populate job opening details
      .exec();

    return res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get details of a specific application
exports.getApplicationDetails = async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId)
      .populate('user')
      .populate('opening');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    return res.status(200).json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
