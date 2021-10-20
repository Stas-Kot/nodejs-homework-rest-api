const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')

const { User } = require('../../models')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  //   const newUser = new User({ email })
  //   newUser.setPassword(password)
  //   await newUser.save()
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const newUser = {
    email,
    password: hashPassword,
    avatarURL: gravatar.url(email),
  }
  await User.create(newUser)
  res.status(201).json({
    status: 'success',
    code: 201,
    user: {
      email: email,
      subscription: 'starter',
    },
  })
}

module.exports = signup
