const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')
const { v4 } = require('uuid')

const { User } = require('../../models')

const userDir = path.join(__dirname, '../../', 'public/avatars')

const updateAvatar = async (req, res) => {
  const { path: tempStorage, originalname } = req.file
  const { _id, email } = req.user
  const [extention] = email.split('@')
  const newFileName = `${extention}_avatar_${v4()}.jpg`
  Jimp.read(originalname)
    .then((avatar) => {
      return avatar.resize(250, 250).write(newFileName)
    })
    .catch((err) => {
      console.error(err)
    })
  try {
    const resultStorage = path.join(userDir, newFileName)
    fs.rename(tempStorage, resultStorage)
    const avatar = path.join('/avatars', newFileName)

    await User.findByIdAndUpdate(_id, { avatarURL: avatar }, { new: true })
    res.json({
      status: 'success',
      code: 200,
      user: {
        avatarURL: newFileName,
      },
    })
  } catch (error) {
    await fs.unlink(tempStorage)
    throw error.message
  }
}

module.exports = updateAvatar
