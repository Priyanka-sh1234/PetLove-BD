const Joi = require('joi');

const registrationValidation = Joi.object({
  username: Joi.string().required().min(3),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(5),
  confirmPassword: Joi.string().required().min(5).valid(Joi.ref('password')).messages({
    'any.only': 'Passwords do not match',
  }),
  petName: Joi.string().required(),
  petType: Joi.string().required(),
  breed: Joi.string().required(),
  contact: Joi.string(),
});

module.exports = { registrationValidation };
