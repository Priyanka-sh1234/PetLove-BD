// services/loginValidation.js
const Joi = require("joi");

const loginValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().min(12).required().email(),
  password: Joi.string().min(5).required(),
});

module.exports = { loginValidation };
