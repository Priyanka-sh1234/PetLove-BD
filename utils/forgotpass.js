// forgotpass.js
const ClinicUser = require("../models/clinicregisterModel");
const ParentUser = require("../models/webregisterModel");

// const nodemailer = require("nodemailer");

const otpStore = {}; // email => { otp, expiresAt }

const forgotPass = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await ClinicUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Email does not exist!" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    // TODO: Uncomment and configure transporter for real emails
    /*
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Clinic Password Reset",
      text: `Hello ${user.username}, Your OTP is: ${otp}. It expires in 5 minutes.`,
    });
    */

    res.status(201).json({ success: true, message: "OTP sent to email", email , otp});
  } catch (err) {
    next(err);
  }
};


const ParentForgotPass = async(req,res,next) =>{
  try {
    const { email } = req.body;
    const user = await ParentUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Email does not exist!" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    // TODO: Uncomment and configure transporter for real emails
    /*
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Clinic Password Reset",
      text: `Hello ${user.username}, Your OTP is: ${otp}. It expires in 5 minutes.`,
    });
    */

    res.status(201).json({ success: true, message: "OTP sent to email", email , otp});
  } catch (err) {
    next(err);
  }
}

module.exports = { forgotPass, otpStore, ParentForgotPass };
