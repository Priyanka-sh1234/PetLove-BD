const Joi = require('joi');

const registrationValidation = Joi.object({
  username: Joi.string().required().min(3),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
});

module.exports = { registrationValidation };
