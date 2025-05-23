const { Schema, model } = require('mongoose');

const registerSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
  
});

const Register = model('Register', registerSchema, 'registers');

module.exports = Register;


