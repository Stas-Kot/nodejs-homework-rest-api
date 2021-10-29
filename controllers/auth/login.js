const { Unauthorized } = require('http-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../../models')
const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, '_id email password verify')
  //   if (!user || !user.comparePassword(password)) {
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Unauthorized('Email or password is wrong')
  }
  if (!user.verify) {
    throw new Unauthorized('Email not verify')
  }
  const { _id } = user
  const payload = {
    _id,
  }
  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(_id, { token })
  res.json({
    status: 'success',
    code: 200,
    token,
    user: {
      email: email,
      subscription: user.subscription,
    },
  })
}

module.exports = login
