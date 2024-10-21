const multer = require('multer');

// Configure multer for handling file uploads (e.g., profilePic, resume)
const storage = multer.memoryStorage(); // You can change this to save files to disk
const upload = multer({ storage: storage });

const Application = require('../models/Application');
const StudentProfileModel = require('../models/StudentProfileModel');
const Institute = require('../models/Institute');

// Update the route to include multer
exports.submitApplication = [
  upload.fields([
    { name: 'resume', maxCount: 1 },     // Resume upload field
    { name: 'profilePic', maxCount: 1 }  // Profile pic upload field
  ]),
  async (req, res) => {
    try {

      // Extract the data from form-data
      const {
        name,
        headline,
        currentEmployment,
        educationalDegree,
        openForJobs,
        pastExperience,
        skills,
        linkedinLink,
        githubLink,
        jobCategory,
        contactNumber,
        email,
        instituteId,
        openingId
      } = req.body;

      // Handle file uploads (e.g., resume and profilePic)
      const resume = req.files['resume'] ? req.files['resume'][0].buffer.toString('base64') : null;
      const profilePic = req.files['profilePic'] ? req.files['profilePic'][0].buffer.toString('base64') : null;



      const userId = req.user._id;
      console.log('User ID:', userId);

      const studentProfile = await StudentProfileModel.findOne({ user: userId });
      if (!studentProfile) {
        return res.status(404).json({ message: 'Student profile not found.' });
      }

      const institute = await Institute.findById(instituteId);
      if (!institute) {
        return res.status(404).json({ message: 'Institute not found.' });
      }

      const existingApplication = await Application.findOne({
        user: studentProfile.user,
        openings: openingId,
        institute: institute._id
      });

      if (existingApplication) {
        return res.status(400).json({ message: 'You have already applied to this opening at this institute.' });
      }

      const newApplication = new Application({
        user: studentProfile.user,
        openings: openingId,
        institute: institute._id,
        details: {
          name,
          headline,
          currentEmployment,
          educationalDegree,
          openForJobs,
          resume, // Store the file (base64 or a URL if stored in a cloud)
          pastExperience,
          skills: skills.split(','), // Convert skills from CSV string to array
          linkedinLink,
          githubLink,
          jobCategory,
          contactNumber,
          email,
          profilePic // Store the file (base64 or a URL if stored in a cloud)
        }
      });

      await newApplication.save();

      res.status(201).json({ message: 'Application submitted successfully.', application: newApplication });
    } catch (error) {
      console.error('Error submitting application:', error);
      res.status(500).json({ message: `Error submitting application: ${error.message}` });
    }
  }
];
