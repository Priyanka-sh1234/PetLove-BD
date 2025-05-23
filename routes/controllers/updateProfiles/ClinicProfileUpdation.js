const Clinic = require('../../../models/clinicregisterModel');


const updateClinicProfile = async (req, res) => {
    try {
        const clinicId = req.query.id;

        console.log("Clinic ID:", clinicId); 

        const { username, image, petSpeciality, location } = req.body;

        
        if (!image || !petSpeciality || !location) {
            return res.status(400).json({
                success: false,
                message: "All fields (username, image, petSpeciality, location) are required.",
            });
        }

        
        const updatedClinic = await Clinic.findByIdAndUpdate(
            clinicId,
            {
                clinicImage: image,
                petSpeciality,
                location,
            },
            { new: true }
        );

        if (!updatedClinic) {
            return res.status(404).json({
                success: false,
                message: "Clinic not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Clinic profile updated successfully.",
            data: updatedClinic,
        });

    } catch (error) {
        console.error("Clinic profile update error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while updating the profile.",
        });
    }
};

module.exports = {
    updateClinicProfile
};
