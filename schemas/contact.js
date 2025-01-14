const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().min(1).max(99).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ru'] },
    })
    .required(),

  phone: Joi.string().min(1).required(),
})

module.exports = contactSchema
