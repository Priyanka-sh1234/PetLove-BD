const AllAppointments = require('../../../models/Appointment.model');



// Controller for fetching all Clinics
const getAppointments = async (req, res) => {
  try {

    const Appointment = await AllAppointments.find();


    if (!Appointment || Appointment.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No Appointments found.',
      });
    }

    res.status(200).json({
      success: true,
      data: Appointment,
    });
  } 
  
  catch (error) {
    console.error('Error fetching pet owners:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pet owners data.',
    });
  }
};

module.exports ={getAppointments}