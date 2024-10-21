// models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   bio: { type: String },
   // Add other fields as per your Django model
});

module.exports = mongoose.model('Profile', profileSchema);
