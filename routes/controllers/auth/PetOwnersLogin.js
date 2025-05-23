const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Register = require('../../../models/webregisterModel');
const Tokenlogin = require('../../../models/tokenLogin');

const login = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    // Step 1: Find user
    const user = await Register.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }

    // Step 2: Compare password with hashed one
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect password',
      });
    }

    //step4:
    // token generation

    const token = jwt.sign({username, email, password},
      process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });


    const newToken = new Tokenlogin({username,email, password, token})
    await newToken.save()


    // Step 5: Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        Id: user._id,
        username: user.username,
        email: user.email,
        token: token,
        contact: user.contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
