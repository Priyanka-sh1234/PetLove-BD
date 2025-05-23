const Joi = require('joi');

const QueryValidation = Joi.object({
  email: Joi.string().required().email(), 
  yourStatus: Joi.string().required(),
  enquiry: Joi.string().min(15),
});

module.exports = { QueryValidation };
