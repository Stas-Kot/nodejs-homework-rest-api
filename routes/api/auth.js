const express = require('express')
const router = express.Router()

const { userJoiSchema, verifyMailJoiSchema } = require('../../models/user')
const {
  controllerWrapper,
  validation,
  authentication,
  uploadMiddleware,
} = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')

router.post(
  '/signup',
  validation(userJoiSchema),
  controllerWrapper(ctrl.signup),
)
router.get('/verify/:verifyToken', controllerWrapper(ctrl.verifyToken))
router.post(
  '/verify',
  validation(verifyMailJoiSchema),
  controllerWrapper(ctrl.verify),
)
router.post('/login', validation(userJoiSchema), controllerWrapper(ctrl.login))
router.post('/logout', authentication, controllerWrapper(ctrl.logout))
router.get('/current', authentication, controllerWrapper(ctrl.current))
router.patch(
  '/avatars',
  authentication,
  uploadMiddleware.single('avatar'),
  controllerWrapper(ctrl.updateAvatar),
)

module.exports = router
