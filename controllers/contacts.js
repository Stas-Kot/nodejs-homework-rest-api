const { NotFound } = require('http-errors')

const { sendSuccessRes } = require('../utils')
const contactsOperations = require('../model/contacts')

const getAll = async (req, res) => {
  const contacts = await contactsOperations.listContacts()
  sendSuccessRes(res, { contacts })
}

const getById = async (req, res) => {
  const result = await contactsOperations.getContactById(req.params.contactId)
  if (!result) {
    throw new NotFound(`Contact with id:${req.params.contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const add = async (req, res) => {
  const result = await contactsOperations.addContact(req.body)
  sendSuccessRes(res, { result }, 201)
}

const removeById = async (req, res) => {
  const result = await contactsOperations.removeContact(req.params.contactId)
  if (!result) {
    throw new NotFound(`Contact with id:${req.params.contactId} not found`)
  }
  sendSuccessRes(res, { message: 'Contact deleted' })
}

const updateById = async (req, res) => {
  const result = await contactsOperations.updateContact(
    req.params.contactId,
    req.body,
  )
  if (!result) {
    throw new NotFound(`Contact with id:${req.params.contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

module.exports = {
  getAll,
  getById,
  add,
  removeById,
  updateById,
}
