const ReportsModel = require('../../../models/Reports/ReportsModel');
const { reportValidation } = require("../../../services/ReportsValidation");

const UserReport = async (req, res, next) => {
    try {
        // Step 1: Validation
        const validatedValues = await reportValidation.validateAsync(req.body);

        const {
            parentName,
            parentEmail,
            date,
            Timings,
            reportText,
            clinicName,
            clinicEmail
        } = validatedValues;

        // Step 2: Verification
        if (!parentName || !parentEmail || !date || !Timings || !reportText || !clinicName || !clinicEmail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Step 3: Create Report
        const reportFile = req.file ? req.file.filename : null;

        const newReport = new ReportsModel({
            parentName,
            parentEmail,
            date,
            Timings,
            reportText,
            clinicName,
            clinicEmail,
            reportFile
        });

        await newReport.save();

        // Step 4: Response
        res.status(200).json({
            success: true,
            message: "Report added successfully!",
            data: newReport
        });

    } catch (error) {
        next(error);
    }
};

module.exports = UserReport;
