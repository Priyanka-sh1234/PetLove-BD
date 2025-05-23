//Get all appoints for a clinic

const AllAppointments = require('../../../models/Appointment.model');

const getAllAppointForClinic = async (req, res) => {
    try {
        const { clinicEmail, id } = req.query;

        if (!clinicEmail && !id) {
            return res.status(400).json({
                success: false,
                message: "ClinicEmail and Id is required!!"
            });
        }

        const appointments = await AllAppointments.find({ clinicEmail });

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No appointments found for this clinic"
            });
        }

        const totalAppoint = appointments.length;

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        // Count appointments for today
        const todaycount = await AllAppointments.countDocuments({
            clinicEmail,
            appointmentDate: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Appointments found",
            data: appointments,
            count: totalAppoint,
            todayCount: todaycount,
        });

    } catch (error) {
        console.error("Error fetching clinic appointments:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch appointments"
        });
    }
};

module.exports = { getAllAppointForClinic };
