const { Schema, model } = require('mongoose');

const webRegisterSchema = new Schema({
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
  petName: {
    type: String,
    required: true,
  },
  petType: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    default: null,
  }
});

const Register = model('WebRegister', webRegisterSchema, 'Webregisters');

module.exports = Register;
