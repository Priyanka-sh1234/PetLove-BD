const Joi = require('joi');

const appointmentValidation = Joi.object({
    clinicName: Joi.string().required(), 
    clinicEmail:Joi.string().email().required(),
    location: Joi.string().required(), 
    petName: Joi.string().required(),
    parentName: Joi.string().required(),
    parentEmail: Joi.string().required().email(),
    parentContact: Joi.number().required(),
    appointmentDate: Joi.date().required(), 
    appointmentTime: Joi.string().valid('morning', 'afternoon', 'evening').required(),
    appointmentStatus:Joi.string(),
  });
  

module.exports = { appointmentValidation };
