const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 200 },
    address: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    contact: { type: String, required: true },
    phone: { type: String, required: true },
    phone2: { type: String, required: true },
    email: { type: String, trim: true,  lowercase: true, },
    photo: { data: Buffer, contentType: String },
    hoursOfOperation: { type: String, required: true },
    areaOfOperation: { type: String, required: true },  //zipcode
    // vendorDriver: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
    isActive: { type: Boolean, default: true },
    createdOn: { type: Date, default: Date.now }
},
    { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
