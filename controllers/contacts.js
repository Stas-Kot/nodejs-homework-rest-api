const { NotFound } = require('http-errors')

const { sendSuccessRes } = require('../utils')
const { Contact } = require('../models')

const getAll = async (req, res) => {
  const contacts = await Contact.find({}, '_id name email phone favorite')
  sendSuccessRes(res, { contacts })
}

const getById = async (req, res) => {
  const id = req.params.contactId
  const result = await Contact.findById(id, '_id name email phone favorite')
  if (!result) {
    throw new NotFound(`Contact with id:${req.params.contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const add = async (req, res) => {
  const result = await Contact.create(req.body)
  sendSuccessRes(res, { result }, 201)
}

const removeById = async (req, res) => {
  const id = req.params.contactId
  const result = await Contact.findByIdAndDelete(id)
  if (!result) {
    throw new NotFound(`Contact with id:${req.params.contactId} not found`)
  }
  sendSuccessRes(res, { message: 'Contact deleted' })
}

const updateById = async (req, res) => {
  const id = req.params.contactId
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
  if (!result) {
    throw new NotFound(`Contact with id:${id} not found`)
  }
  sendSuccessRes(res, { result })
}

const updateStatusContact = async (req, res) => {
  const id = req.params.contactId
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true },
  )
  if (!result) {
    throw new NotFound(`Contact with id:${id} not found`)
  }
  sendSuccessRes(res, { result })
}

module.exports = {
  getAll,
  getById,
  add,
  removeById,
  updateById,
  updateStatusContact,
}
