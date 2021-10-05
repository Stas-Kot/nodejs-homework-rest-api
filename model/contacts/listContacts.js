const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath, 'utf-8'))
}

module.exports = listContacts
