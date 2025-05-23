const Clinic = require("../../../models/clinicregisterModel");

exports.ClinicDeleteAccount = async (req, res, next) => {
    try {
        const { id } = req.params; 
        console.log("Deleting clinic with ID:", id);

        // Use findOneAndDelete with _id filter
        const userDeleted = await Clinic.findOneAndDelete({ _id: id });

        if (!userDeleted) {
            return res.status(400).json({
                success: false,
                message: "Unable to find the user. Deletion not possible.",
                id,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully!",
        });

    } catch (error) {
        console.error("Error deleting clinic account:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while deleting account",
        });
    }
};
