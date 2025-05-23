const mongoose = require('mongoose');

const clinicMoreDetailsSchema = new mongoose.Schema({
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic', 
        required: true,
        unique: true,
    },
    clinicEmail:{
        type: String,
        required: true,
    },
    openTime: {
        type: String,
        required: true,
    },
    closeTime: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    services: {
        type: [String], 
        default: [],
    },
    emergencyAvailable: {
        type: Boolean,
        default: false,
    },
    contactNumber: {
        type: String,
    },
    additionalNotes:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('ClinicMoreDetails', clinicMoreDetailsSchema);
