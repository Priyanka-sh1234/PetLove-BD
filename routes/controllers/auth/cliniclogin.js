const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ClinicRegister = require('../../../models/clinicregisterModel');
const Tokenlogin = require('../../../models/tokenLogin');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Step 1: Basic input validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
    }

    // Step 2: Check if user exists
    const user = await ClinicRegister.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }

    // Step 3: Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect password',
      });
    }

    //step 4: token generation
    const email = user.email;
    const token = jwt.sign({username, email, password},
          process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_TIMEOUT,
        });
    
    
        const newToken = new Tokenlogin({username, email, password, token})
        await newToken.save()
    
    // Step 6: Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        username: user.username,
        Id: user._id,
        email: user.email,
        Token: token,
      },
    });

  } catch (error) {
    next(error);
  }
};

module.exports = login;
