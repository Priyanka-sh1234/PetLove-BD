const Joi = require('joi');

const reportValidation = Joi.object({
    parentName: Joi.string().required(),
    parentEmail: Joi.string().email().required(),
    date: Joi.date().required(),
    Timings: Joi.string().required(),
    reportText: Joi.string().required(),
    clinicName: Joi.string().required(),
    clinicEmail: Joi.string().email().required(),
});

module.exports = { reportValidation };
