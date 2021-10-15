const { NotFound } = require('http-errors')

const { sendSuccessRes } = require('../utils')
const { Contact } = require('../models')

const getAllByUser = async (req, res) => {
  const { _id } = req.user
  const contacts = await Contact.find(
    { owner: _id },
    '_id name email phone favorite owner',
  )
  sendSuccessRes(res, { contacts })
}

const getById = async (req, res) => {
  const id = req.params.contactId
  const result = await Contact.findById(
    id,
    '_id name email phone favorite owner',
  )
  if (!result) {
    throw new NotFound(`Contact with id:${id} not found`)
  }
  sendSuccessRes(res, { result })
}

const add = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id }
  const result = await Contact.create(newContact)
  sendSuccessRes(res, { result }, 201)
}

const removeById = async (req, res) => {
  const id = req.params.contactId
  const result = await Contact.findByIdAndDelete(id)
  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id:${req.params.contactId} not found`,
    })
    return
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
  getAllByUser,
  getById,
  add,
  removeById,
  updateById,
  updateStatusContact,
}
