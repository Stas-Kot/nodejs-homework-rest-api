const { NotFound } = require('http-errors')

const controllerWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next)
    } catch (error) {
      console.log(error)
      next(new NotFound('Not found'))
    }
  }
}

module.exports = controllerWrapper
