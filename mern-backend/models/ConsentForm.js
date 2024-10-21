// models/ConsentForm.js
const mongoose = require('mongoose');

const consentFormSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   consentGiven: { type: Boolean, required: true },
   // Add other fields as per your Django model
});

module.exports = mongoose.model('ConsentForm', consentFormSchema);
