const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { nanoid } = require('nanoid')

const { User } = require('../../models')

const { sendEmail } = require('../../utils')

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

  const verifyToken = nanoid()

  const newUser = {
    email,
    password: hashPassword,
    avatarURL: gravatar.url(email),
    verifyToken,
  }
  await User.create(newUser)

  const data = {
    to: email,
    subject: 'Please confirm your email',
    html: `
  <a href="http://localhost:3000/api/users/verify/${verifyToken}">Confirm your email</a>
  `,
  }

  await sendEmail(data)
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
