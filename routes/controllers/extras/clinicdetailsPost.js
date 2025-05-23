const ClinicMoreDetails = require('../../../models/Extras/clinicDetails'); 

exports.setClinicDetails = async (req, res) => {
    try {
        const { clinicId, openTime, closeTime, about, contactNumber, emergencyAvailable, services,additionalNotes } = req.body;

        
        let clinicDetails = await ClinicMoreDetails.findOne({ clinicId });

        if (clinicDetails) {
            
            clinicDetails.set({
                openTime, 
                closeTime, 
                about, 
                contactNumber, 
                emergencyAvailable, 
                services,
                additionalNotes,
            });
            await clinicDetails.save();
        } else {
            
            clinicDetails = new ClinicMoreDetails({
                clinicId,
                openTime,
                closeTime,
                about,
                contactNumber,
                emergencyAvailable,
                services,
                additionalNotes,
            });
            await clinicDetails.save();
        }

        
        res.status(200).json({ 
            success: true, 
            message: 'Clinic details saved successfully', 
            data: clinicDetails 
        });

    } catch (error) {
        console.error('Set Clinic Details Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
