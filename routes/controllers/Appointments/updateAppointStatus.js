const AppointmentModel = require('../../../models/Appointment.model');

const updateAppointmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const appointment = await AppointmentModel.findById(id);

        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        appointment.appointmentStatus = status;
        await appointment.save();

        return res.status(200).json({
            success: true,
            message: `Appointment status updated to ${status}`,
            appointment,
        });
    } catch (error) {
        console.error("Error updating appointment status:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while updating appointment status",
        });
    }
};

module.exports = updateAppointmentStatus;
