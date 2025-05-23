const bcrypt = require('bcrypt');
const Register = require('../../../models/webregisterModel');
const { registrationValidation } = require('../../../services/webRegisterValidation');
const nodemailer = require('nodemailer');
require('dotenv').config();

const register = async (req, res, next) => {
  try {
    // Step 1: Validate
    const registerValues = await registrationValidation.validateAsync(req.body);
    const { username, email, password, confirmPassword, petName, petType, breed, contact } = registerValues;

    // Step 2: Check if email already exists
    const emailExists = await Register.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
        data: { email }
      });
    }

    // Step 3: Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    // Step 4: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 5: Save user
    const newUser = new Register({
      username,
      email,
      password: hashedPassword,
      petName,
      petType,
      breed,
      contact
    });

    await newUser.save();

    // Step 6: Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"PetLove Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🐾 Welcome to PetLove!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f4f4f4; padding: 25px; border-radius: 10px;">
          <h2 style="text-align: center; color: #4CAF50;">Welcome, ${username}!</h2>
          <p>Thank you for registering at PetLove. We're excited to help you take care of your pet 🐶🐱.</p>

          <h3>Your Pet Details:</h3>
          <ul style="font-size: 16px; color: #333;">
            <li><strong>Pet Name:</strong> ${petName}</li>
            <li><strong>Type:</strong> ${petType}</li>
            <li><strong>Breed:</strong> ${breed}</li>
            <li><strong>Contact:</strong> ${contact}</li>
          </ul>

          <p>If you have any questions, feel free to reach out to our support team anytime.</p>
          <br>
          <p style="color: #555;">With care,<br><strong>PetLove Team</strong></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    // Step 7: Response
    res.status(201).json({
      success: true,
      message: 'User registered successfully. Confirmation email sent.',
      data: { username, email, petName, petType, breed, contact }
    });

  } catch (error) {
    next(error);
  }
};

module.exports = register;
