const axios = require('axios');
const jwt = require('jsonwebtoken');
const { oauth2Client } = require('../../../utils/googleClient');
const Register = require('../../../models/clinicregisterModel'); // This is your main clinic model

exports.googleAuth = async (req, res, next) => {
    try {
        // Step 1: Get authorization code from request
        const code = req.query.code;

        // Step 2: Exchange code for tokens
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);

        // Step 3: Get user info from Google
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const { email, name, picture } = userRes.data;

        // Step 4: Check if user already exists in our DB
        let user = await Register.findOne({ email });

        if(user){
            return res.status(400).json({
                message: "User Already exists",
                success:false,
            })
        }

        // Step 5: If not, create a new clinic user with placeholders
        if (!user) {
            user = await Register.create({
                username: name,
                email,
                password: 'google_oauth_dummy', // Required field, not used for Google users
                clinicImage: picture || 'https://example.com/default-image.jpg',
                location: 'To be updated',
                petSpeciality: 'General',
                role: 'Staff',
            });
        }

        // Step 6: Generate JWT token
        const { _id } = user;
        const token = jwt.sign({ _id, email },
            process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TIMEOUT,
        });

        // Step 7: Respond with user and token
        res.status(200).json({
            message: 'Google signup successful',
            token,
            user,
            _id,
            name,
        });

    } catch (err) {
        console.error('Google Auth Error:', err.message);
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
};
