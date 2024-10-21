const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  opening: { type: Schema.Types.ObjectId, ref: 'Opening', required: true },
  applied_on: { type: Date, default: Date.now }, // Automatically set the apply date
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }, // Application status
  resume: { type: String }, // Optional field to store a resume file link
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
