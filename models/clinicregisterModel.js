const { required } = require('joi');
const { Schema, model } = require('mongoose');

const ClinicRegisterSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  clinicImage: {
    type: String, 
    required: true,
  },
  location: {
    type: String, 
    required: true,
  },
  petSpeciality: {
    type: String, 
    required: true,
  },
  role: {
    type: String, 
    default: 'Staff',
  },
});

const Register = model('ClinicRegister', ClinicRegisterSchema, 'Clinicregisters');

module.exports = Register;
