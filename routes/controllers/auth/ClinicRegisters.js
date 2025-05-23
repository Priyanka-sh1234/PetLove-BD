const Register = require('../../../models/clinicregisterModel');
const { ClinicregistrationValidation } = require('../../../services/ClinicRegisterValidation');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Clinicregister = async (req, res, next) => {
  try {
    // Validate request body
    const registerValues = await ClinicregistrationValidation.validateAsync(req.body);
    const { 
      username, 
      email, 
      password, 
      confirmPassword,
      clinicImage, 
      location, 
      petSpeciality,
      role,
    } = registerValues;

    // Check if username already exists
    const userExists = await Register.findOne({ username });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Username already taken',
        data: { username }
      });
    }

    // Check if email already exists
    const emailExists = await Register.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
        data: { email }
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new clinic user
    const newUser = new Register({
      username, 
      email, 
      password: hashedPassword,
      clinicImage,
      location, 
      petSpeciality,
      role
    });

    await newUser.save();

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: `"PetLove Registration" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🎉 Welcome to PetLove!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; padding-bottom: 20px;">
            <h2 style="color: #4CAF50;">Welcome to PetCare, ${username}!</h2>
          </div>
          
          <p style="font-size: 16px; color: #333;">
            We're thrilled to have your clinic join our community of passionate pet care professionals. Your account has been successfully registered!
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

          <div style="font-size: 16px; color: #333;">
            <p><strong>📍 Location:</strong> ${location}</p>
            <p><strong>🐾 Pet Speciality:</strong> ${petSpeciality}</p>
            <p><strong>👤 Role:</strong> ${role}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

          <p style="font-size: 16px; color: #333;">
            If you have any questions or need support, feel free to reach out to us anytime.
          </p>

          <p style="font-size: 16px; color: #333;">Warm wishes,<br/><strong>The PetLove Team</strong></p>
        </div>
      `
    };

    // Send confirmation email
    await transporter.sendMail(mailOptions);

    // Success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully, confirmation email sent',
      data: { username, email, clinicImage, location, petSpeciality, role }
    });

  } catch (error) {
    next(error);
  }
};

module.exports = Clinicregister;
