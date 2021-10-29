const { NotFound } = require('http-errors')

const { User } = require('../../models')

const verifyToken = async (req, res) => {
  const { verifyToken } = req.params
  const user = await User.findOne({ verifyToken })

  if (!user) {
    throw new NotFound('User not found')
  }
  await User.findOneAndUpdate(
    { verifyToken },
    { verifyToken: null, verify: true },
  )
  res.json({
    status: 'success',
    code: 200,
    message: 'Verification successful',
  })
}

module.exports = verifyToken
