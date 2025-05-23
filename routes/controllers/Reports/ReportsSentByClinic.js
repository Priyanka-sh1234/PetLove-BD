const ReportsModel = require('../../../models/Reports/ReportsModel');

const getReportsByClinic = async (req, res, next) => {
    try {
        const { clinicEmail } = req.query; // Expect clinicEmail in the query

        if (!clinicEmail) {
            return res.status(400).json({ success: false, message: "Clinic email is required" });
        }

        // Fetch reports for the given clinicEmail
        const reports = await ReportsModel.find({ clinicEmail });

        if (!reports.length) {
            return res.status(404).json({ success: false, message: "No reports found for this clinic" });
        }

        res.status(200).json({ success: true, data: reports });
    } catch (error) {
        next(error);
    }
};


module.exports = getReportsByClinic