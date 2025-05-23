const Joi = require('joi');

const ClinicregistrationValidation = Joi.object({
  username: Joi.string().required().min(3), 
  email: Joi.string().required().email(), 
  password: Joi.string().required().min(8),
  confirmPassword: Joi.string().required().min(5),
  clinicImage: Joi.string().uri().required(), 
  location: Joi.string().required().min(5), 
  petSpeciality: Joi.string().required().min(3),
  role: Joi.string(),
});

module.exports = { ClinicregistrationValidation };


