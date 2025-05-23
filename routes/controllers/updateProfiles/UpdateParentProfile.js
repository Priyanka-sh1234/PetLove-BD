const Parent = require('../../../models/webregisterModel');

const updateParentProfile = async (req, res) => {
    const { id } = req.query;
    const { username, email, petName, petType, breed, contact } = req.body;

    // Validate required fields
    if (!id) {
        return res.status(400).json({ success: false, message: 'Parent ID is required' });
    }

    if (!username || !email || !petName || !petType || !breed || !contact) {
        return res.status(400).json({ success: false, message: 'All fields (username, email, petName, petType, breed, contact) are required' });
    }

    try {
        const updatedProfile = await Parent.findOneAndUpdate(
            { _id: id },
            { username, email, petName, petType, breed, contact }, // Add the contact field
            { new: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ success: false, message: 'Parent not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: updatedProfile,
        });

    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = { updateParentProfile };





// const Parent = require('../../../models/webregisterModel');


// const updateParentProfile = async (req, res) => { 
//     const {id, username, email, petName, petType, breed } = req.body;

//     if (!id) {
//         return res.status(400).json({ success: false, message: 'Parent ID is required' });
//     }

//     try {
//         const parent = await Parent.findById(id);

//         if (!parent) {
//             return res.status(404).json({ success: false, message: 'Parent not found' });
//         }

//         parent.username = username || parent.username;
//         parent.email = email || parent.email;
//         parent.petName = petName || parent.petName;
//         parent.petType = petType || parent.petType;
//         parent.breed = breed || parent.breed;

//         const updatedProfile = await parent.save();

//         return res.status(200).json({
//             success: true,
//             message: 'Profile updated successfully',
//             updatedProfile
//         });
//     } 
    
//     catch (error) {
//         // console.error('Error updating profile:', error);
//         // return res.status(500).json({ success: false, message: 'Internal server error' });
//         next(error)
//     }
// };


// module.exports={updateParentProfile}
