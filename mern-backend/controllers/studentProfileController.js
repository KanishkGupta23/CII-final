const StudentProfileModel = require("../models/StudentProfileModel.js"); // Adjust the import to use require
const path = require("path");
const fs = require("fs"); // Ensure you require fs for file handling

// Controller to handle the profile update
exports.updateStudentProfile = async (req, res) => {
  try {
    const { userId } = req.body; // Assuming userId is passed in the request body
    const {
      name, headline, currentEmployment, educationalDegree, institute,
      openForJobs, pastExperience, skills, linkedinLink, githubLink,
      jobCategory, contactNumber, email
    } = req.body;

    // Prepare profile data from the request body
    const profileData = {
      name,
      headline,
      currentEmployment,
      educationalDegree,
      institute,
      openForJobs,
      pastExperience,
      skills: skills.split(','), // Assuming skills are sent as a comma-separated string
      linkedinLink,
      githubLink,
      jobCategory,
      contactNumber,
      email,
      user: userId
    };

    // Handle file uploads (resume and profile picture)
    if (req.files) {
      // If a resume is uploaded
      if (req.files.resume && req.files.resume.length > 0) {
        // Store the resume path or URL as needed
        profileData.resume = `/uploads/resumes/${req.files.resume[0].originalname}`;
        // Save the file temporarily for demo purposes; you can adjust this logic as needed
        const resumePath = path.join(__dirname, '..', 'uploads', 'resumes', req.files.resume[0].originalname);
        fs.writeFile(resumePath, req.files.resume[0].buffer, (err) => {
          if (err) {
            console.error('Error saving resume:', err);
          }
        });
      }

      // If a profile picture is uploaded
      if (req.files.profilePic && req.files.profilePic.length > 0) {
        // Store the profile picture path or URL as needed
        profileData.profilePic = `/uploads/profile_pics/${req.files.profilePic[0].originalname}`;
        // Save the file temporarily for demo purposes; you can adjust this logic as needed
        const profilePicPath = path.join(__dirname, '..', 'uploads', 'profile_pics', req.files.profilePic[0].originalname);
        fs.writeFile(profilePicPath, req.files.profilePic[0].buffer, (err) => {
          if (err) {
            console.error('Error saving profile picture:', err);
          }
        });
      }
    }
    const existingProfile = await StudentProfileModel.findOne({ user: userId });

    if (existingProfile) {
      // Update the existing profile
      await StudentProfileModel.updateOne({ user: userId }, profileData);
      res.status(200).json({ message: 'Profile updated and submitted for verification.' });
    } else {
      // Create a new profile
      console.log(profileData)
      const newProfile = new StudentProfileModel(profileData);
      await newProfile.save();
      res.status(201).json({ message: 'Profile created and submitted for verification.' });
    }

  } catch (error) {
    res.status(500).json({ message: `Error updating profile: ${error.message}` });
  }
};

// Controller to fetch a single student profile by user ID
exports.getStudentProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await StudentProfileModel.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    res.status(200).json(profile); // Send the profile details back
  } catch (error) {
    res.status(500).json({ message: `Error fetching profile: ${error.message}` });
  }
};
