const PetOwner = require('../../../models/webregisterModel');  // Import PetOwner model

// Controller for fetching all pet owners
exports.getPetOwners = async (req, res) => {
  try {

    const petOwners = await PetOwner.find();


    if (!petOwners || petOwners.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No pet owners found.',
      });
    }

    res.status(200).json({
      success: true,
      data: petOwners,
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

