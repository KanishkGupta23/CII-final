const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentProfileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    headline: { type: String },
    currentEmployment: { type: String },
    educationalDegree: { type: String, required: true },
    institute: { type: Schema.Types.ObjectId, ref: 'Institute', required: true }, // Ensure this is ObjectId
    openForJobs: { type: Boolean, default: false },
    resume: { type: String },
    pastExperience: { type: Number, default: 0 },
    skills: { type: [String], required: true },
    linkedinLink: { type: String },
    githubLink: { type: String },
    jobCategory: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    profilePic: { type: String, default: "profile_pic/default.jpg" },
    verified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', StudentProfileSchema);
