const validation = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: error.message,
      })
      return
    }
    next()
  }
}

const statusValidation = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing field favorite',
      })
      return
    }
    next()
  }
}

module.exports = {
  validation,
  statusValidation,
}
