const Profile = require('../models/Industry'); // Adjust the path as needed

// Function to handle profile updates
const updateProfile = async (req, res) => {
    const { 
        name, 
        email_id, 
        contact_num, 
        currently_emp, 
        last_educational_degree, 
        linkedin_link 
    } = req.body;

    try {
        const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, {
            name,
            email_id,
            contact_num,
            currently_emp,
            last_educational_degree,
            linkedin_link
        }, { new: true }); // Return the updated document

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', data: updatedProfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating profile', error });
    }
};

module.exports = { updateProfile };
