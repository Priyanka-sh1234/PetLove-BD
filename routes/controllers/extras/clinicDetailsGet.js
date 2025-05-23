const ClinicDetails = require('../../../models/Extras/clinicDetails');


exports.getClinicDetails = async (req, res) => {
    try {
        const { clinicId } = req.params;

        const clinicDetails = await ClinicDetails.findOne({ clinicId });

        if (!clinicDetails) {
            return res.status(404).json({ success: false, message: 'Clinic details not found' });
        }

        res.status(200).json({ success: true, details: clinicDetails });

    } catch (error) {
        console.error('Get Clinic Details Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};