const Joi = require('joi');

exports.validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    unit: Joi.string().min(3).max(50).required(),
    unitCode: Joi.string().min(3).max(50).required(),
    address: Joi.string().min(3).max(50).required(),
    district: Joi.string().min(3).max(50).required(),
    state: Joi.string().min(3).max(50).required(),
    pincode: Joi.number().required(),
    phone: Joi.number().required(),
    role: Joi.string().min(3).max(50).required(),
    resetLink: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(user);
};

exports.validateReport = (report) => {
  const schema = Joi.object({
    dateStart: Joi.date().required(),
    dateEnd: Joi.date().required(),
    totalStudyCircles: Joi.number().required(),
    totalMembers: Joi.number().required(),
    newMembers: Joi.number().required(),
    dateWise: Joi.array().required(),
    average: Joi.number().required(),
    discussedTopics: Joi.string().required(),
    programs: Joi.string().required(),
    attendedPrograms: Joi.string(),
    socialWork: Joi.string(),
    letter: Joi.string(),
  });

  return schema.validate(report);
};
