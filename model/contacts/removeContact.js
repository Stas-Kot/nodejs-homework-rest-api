const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(({ id }) => id === contactId)
  if (idx === -1) {
    return null
  }

  contacts.splice(idx, 1)
  await updateContacts(contacts)

  return 'Success remove'
}

module.exports = removeContact
