const ReportsModel = require('../../../models/Reports/ReportsModel');

const getReportsByParentEmail = async (req, res) => {
  try {
    const { parentEmail } = req.params;

    if (!parentEmail || typeof parentEmail !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing parentEmail parameter.",
      });
    }

    const reports = await ReportsModel.find({
      parentEmail
    }).sort({ date: -1 });

    if (!reports.length) {
      return res.status(404).json({
        success: false,
        message: 'No reports found for this parent.',
      });
    }

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    console.error("Error fetching reports:", error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching reports',
    });
  }
};

module.exports = {
  getReportsByParentEmail,
};
