// models/InstituteApplied.js
const mongoose = require('mongoose');

const instituteAppliedSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute' },
   // Add other fields as per your Django model
});

module.exports = mongoose.model('InstituteApplied', instituteAppliedSchema);
