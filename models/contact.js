const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
)

const contactJoiSchema = Joi.object({
  name: Joi.string().min(1).max(99).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ru'] },
    })
    .required(),

  phone: Joi.string().min(1).required(),

  favorite: Joi.boolean(),
})

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  contactJoiSchema,
  updateFavoriteJoiSchema,
}
