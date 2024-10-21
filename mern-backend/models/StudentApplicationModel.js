// models/StudentApplicationModel.js
const mongoose = require('mongoose');

const studentApplicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentProfile", // Reference to student profile
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Opening", // Reference to the job opening
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'SentToIndustry'], // Application status
    default: 'Pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const StudentApplicationModel = mongoose.model("StudentApplication", studentApplicationSchema);
module.exports = StudentApplicationModel;
