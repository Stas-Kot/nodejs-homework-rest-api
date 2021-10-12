const express = require('express')
const router = express.Router()

const {
  contactJoiSchema,
  updateFavoriteJoiSchema,
} = require('../../models/contact')
const {
  controllerWrapper,
  validation,
  statusValidation,
} = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validation(contactJoiSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', controllerWrapper(ctrl.removeById))

router.put(
  '/:contactId',
  validation(contactJoiSchema),
  controllerWrapper(ctrl.updateById),
)

router.patch(
  '/:contactId/favorite',
  statusValidation(updateFavoriteJoiSchema),
  controllerWrapper(ctrl.updateStatusContact),
)

module.exports = router
