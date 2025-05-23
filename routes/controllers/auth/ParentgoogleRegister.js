const axios = require('axios');
const jwt = require('jsonwebtoken');
const { oauth2Client } = require('../../../utils/googleClient');
const Register = require('../../../models/webregisterModel'); // use unified model

exports.ParentGoogleRegAuth = async (req, res, next) => {
    try {
        const code = req.query.code;
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const { email, name, picture } = userRes.data;

        // Check if user already exists
        let user = await Register.findOne({ email });

        // If not, create a new user with default values for required fields
        if (!user) {
            user = await Register.create({
                username: name,
                email: email,
                password: 'google-oauth', // <-- hardcoded value
                petName: 'Unknown',
                petType: 'Unknown',
                breed: 'Unknown',
                contact: '',
                isGoogleUser: true
              });
        }

        // Generate JWT
        const { _id } = user;
        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TIMEOUT,
        });

        res.status(200).json({
            message: 'success',
            token,
            user,
            _id,
            username,
            email,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
