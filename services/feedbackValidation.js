const Joi = require('joi');

const feedbackValidation = Joi.object({
  username: Joi.string().required().min(3), 
  email: Joi.string().required().email(), 
  feedbackAs: Joi.string().required(),
  feedback: Joi.string().min(15),
});

module.exports = { feedbackValidation };
