const controllerWrapper = require('./controllerWrapper')
const { validation, statusValidation } = require('./validation')
const authentication = require('./authentication')
const uploadMiddleware = require('./upload')

module.exports = {
  controllerWrapper,
  validation,
  statusValidation,
  authentication,
  uploadMiddleware,
}
