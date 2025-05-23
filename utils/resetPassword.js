const ClinicUser = require("../models/clinicregisterModel");
const ParentUser = require("../models/webregisterModel");
const bcrypt = require('bcrypt');
const { otpStore } = require("./forgotpass");

const resetPassword = async (req, res, next) => {
  const { email, otp, newPassword } = req.body;
  try {
    const record = otpStore[email];
    if (!record) {
      return res.status(400).json({ success: false, message: "OTP expired or not found" });
    }

    if (Date.now() > record.expiresAt) {
      delete otpStore[email];
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const user = await ClinicUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    delete otpStore[email];

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (err) {
    next(err);
  }
};

const resetParentPassword = async (req, res, next) => {
  const { email, otp, newPassword } = req.body;
  try {
    const record = otpStore[email];
    if (!record) {
      return res.status(400).json({ success: false, message: "OTP expired or not found" });
    }

    if (Date.now() > record.expiresAt) {
      delete otpStore[email];
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const user = await ParentUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    delete otpStore[email];

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (err) {
    next(err);
  }
};

module.exports = { resetPassword, resetParentPassword };
