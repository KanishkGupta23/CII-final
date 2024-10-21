const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    openings: { type: mongoose.Schema.Types.ObjectId, ref: 'Opening', required: true },
    institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
    application_date: { type: Date, required: true },
}, { timestamps: true });

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application; // Ensure that the model is exported correctly
