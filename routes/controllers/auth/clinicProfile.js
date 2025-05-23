const User = require('../../../models/clinicregisterModel');

const ClinicProfile = async (req, res) => {
  try {

    //to find the user from token and data , coming form the frontend
    const user = await User.findOne({ username: req.user.username });


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }



    //to remove the password coming from the user model and then add other whole information in the userprofile
    const { password, ...userProfile } = user.toObject();


    res.status(200).json({
      success: true,
      data: userProfile,
    });

  } 
  
  catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {ClinicProfile};
