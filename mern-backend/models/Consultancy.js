// models/Consultancy.js
const mongoose = require('mongoose');

const consultancySchema = new mongoose.Schema({
   name: { type: String, required: true },
   services: { type: [String] },
   // Add other fields as per your Django model
});

module.exports = mongoose.model('Consultancy', consultancySchema);
