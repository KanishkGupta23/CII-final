// models/StudDataUpload.js
const mongoose = require('mongoose');

const studDataUploadSchema = new mongoose.Schema({
   filePath: { type: String, required: true },
   // Add other fields as per your Django model
});

module.exports = mongoose.model('StudDataUpload', studDataUploadSchema);
