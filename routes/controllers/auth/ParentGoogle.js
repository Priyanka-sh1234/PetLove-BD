const axios = require('axios');
const jwt = require('jsonwebtoken');
const { oauth2Client } = require('../../../utils/googleClient');
const User = require('../../../models/webregisterModel');  

exports.ParentLoginGoogleAuth = async (req, res, next) => {
    try {
        // Step 1: Get the Google OAuth code from query
        const code = req.query.code;

        // Step 2: Authenticate the code with Google and get the tokens
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);

        // Step 3: Get the user info from Google using the access token
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        // Step 4: Extract necessary information from the user response
        const { email, name, picture } = userRes.data;

        // Step 5: Check if the user exists in the database
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User does not exist. Please register first.'
            });
        }

        // Step 6: If the user exists, generate a JWT token for them
        const { _id } = user;
        const token = jwt.sign(
            { _id, email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_TIMEOUT }
        );

        // Step 7: Respond with the token and user info
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                _id: user._id,
                name: user.name || name,
                email: user.email,
                image: user.image || picture, 
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
