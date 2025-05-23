
// for parent appoitnments



const AllAppointments = require('../../../models/Appointment.model')

const getAppoint = async (req, res) => {
    try {
        const { parentEmail } = req.query;
        const appointments = await AllAppointments.find({ parentEmail });

        res.status(200).json({
            success: true,
            data: appointments
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch appointments"
        });
    }
}

module.exports= getAppoint