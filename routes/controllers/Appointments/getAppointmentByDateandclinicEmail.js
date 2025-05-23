const AllAppointments = require("../../../models/Appointment.model");

const getAppointmentByDateandclinicEmail = async (req, res, next) => {
    try {
        const { clinicEmail, date } = req.query;

        if (!clinicEmail|| !date) {
            return res.status(400).json({
                success: false,
                message: "clinicName and date are required in query params",
            });
        }

        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setDate(endOfDay.getDate() + 1);

        const response = await AllAppointments.find({
            clinicEmail: clinicEmail,
            appointmentDate: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });

        if (response.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No appointments found for your clinic on this date",
                data: [],
            });
        }

        return res.status(200).json({
            success: true,
            data: response,
        });

    } catch (error) {
        console.error("Error fetching today's appointments:", error);
        next(error);
    }
};

module.exports = { getAppointmentByDateandclinicEmail };

