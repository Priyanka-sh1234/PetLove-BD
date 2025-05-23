const { Schema, model } = require('mongoose');

const ReportsSchema = new Schema({
    clinicName: {
        type: String,
        required: true,
    },
    clinicEmail: {
        type: String,
        required: true,
    },
    parentName: {
        type: String,
        required: true,
    },
    parentEmail: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    Timings: {
        type: String,
        required: true,
    },
    reportText: {
        type: String,
        required: true,
    },
    reportFile: {
        type: String,
    },
}, {
    timestamps: true
});

const ReportsModel = model('Report', ReportsSchema);
module.exports = ReportsModel;
