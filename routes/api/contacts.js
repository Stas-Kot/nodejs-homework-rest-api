const express = require('express')
const router = express.Router()

const {
  contactJoiSchema,
  updateFavoriteJoiSchema,
} = require('../../models/contact')

const {
  controllerWrapper,
  validation,
  authentication,
  statusValidation,
} = require('../../middlewares')

const { contacts: ctrl } = require('../../controllers')

router.get('/', authentication, controllerWrapper(ctrl.getAllByUser))

router.get('/:contactId', authentication, controllerWrapper(ctrl.getById))

router.post(
  '/',
  authentication,
  validation(contactJoiSchema),
  controllerWrapper(ctrl.add),
)

router.delete('/:contactId', authentication, controllerWrapper(ctrl.removeById))

router.put(
  '/:contactId',
  authentication,
  validation(contactJoiSchema),
  controllerWrapper(ctrl.updateById),
)

router.patch(
  '/:contactId/favorite',
  authentication,
  statusValidation(updateFavoriteJoiSchema),
  controllerWrapper(ctrl.updateStatusContact),
)

module.exports = router
