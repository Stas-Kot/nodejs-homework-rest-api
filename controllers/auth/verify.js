const { BadRequest, Unauthorized } = require('http-errors')

const { User } = require('../../models')

const { sendEmail } = require('../../utils')

const verify = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email }, 'verify verifyToken')
  if (!user) {
    throw new Unauthorized('Email or password is wrong')
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }
  const data = {
    to: email,
    subject: 'Please confirm your email',
    html: `
  <a href="http://localhost:3000/api/users/verify/${user.verifyToken}">Confirm your email</a>
  `,
  }

  await sendEmail(data)
  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent',
  })
}

module.exports = verify
