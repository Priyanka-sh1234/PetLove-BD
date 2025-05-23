const Clinic = require('../../../models/clinicregisterModel');



// Controller for fetching all Clinics
exports.getClinics = async (req, res) => {
  try {

    const Clinics = await Clinic.find();


    if (!Clinics || Clinics.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No pet owners found.',
      });
    }

    res.status(200).json({
      success: true,
      data: Clinics,
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

