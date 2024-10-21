const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const industriesSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },
    name: { type: String, maxlength: 200, required: true },
    description: { type: String, maxlength: 500, required: true },

    logo: { type: String, default: "images/industries/default.jpg" }, // Assuming you're using a string path


    registration_date: { type: Date, default: null },
    estb_year: { type: Date, default: null },
    cii_id: { type: Number, required: true },
    website: { type: String, default: null },
    contact_num: { type: Number, required: true },
    email_id: { type: String, required: true },
    address: { type: String, maxlength: 500, required: true },
    city: { type: String, maxlength: 200, required: true },
    state: { type: String, maxlength: 20, required: true },
    pincode: { type: Number, required: true },
    country: { type: String, maxlength: 200, required: true },
    verified: { type: Boolean, default: false },
    domain: { type: String, maxlength: 20, required: true },
  },
  { timestamps: true }
);

const Industry = mongoose.model('Industry',industriesSchema);
module.exports=Industry