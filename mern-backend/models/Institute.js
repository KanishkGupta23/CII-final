const mongoose = require('mongoose');
const { Schema } = mongoose;

const InstitutesSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    name: { type: String, maxlength: 200, required: true },
    description: { type: String, maxlength: 500, required: true },
    logo: { type: String, default: 'images/institutes/default.jpg' },
    registration_date: { type: Date, default: null },
    estb_year: { type: Date, default: null },
    cii_id: { type: Number, required: true },
    website: { type: String, default: null },
    contact_num: { type: Number, required: true },
    email_id: { type: String, required: true },
    address: { type: String, maxlength: 500, required: true },
    city: { type: String, maxlength: 200, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true },
    country: { type: String, required: true },
    verified: { type: Boolean, default: false },
    domain: { type: String, maxlength: 20, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Institute', InstitutesSchema);
