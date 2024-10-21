const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const openingSchema = new Schema({
    job_title: { type: String, required: true },
    description: { type: String, required: true },
    key_skills: [String],
    opening_date: { type: Date, required: true },
    city: String,
    state: String,
    stipend: Number,
    past_experience_required: Boolean,
    industry: { type: mongoose.Schema.Types.ObjectId, ref: 'Industry', required: true },
    apply_by: { type: Date, required: true },
});

const Opening = mongoose.model('Opening', openingSchema);
module.exports = Opening;
