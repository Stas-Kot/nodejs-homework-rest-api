const { v4 } = require('uuid')
const updateContacts = require('./updateContacts')
const listContacts = require('./listContacts')

const addContact = async (body) => {
  const contacts = await listContacts()
  const uniqueName = contacts.find(({ name }) => name === body.name)
  if (uniqueName) {
    throw new Error(`Contact '${body.name}' already exist`)
  }
  const newContact = {
    id: v4(),
    ...body,
  }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

module.exports = addContact
