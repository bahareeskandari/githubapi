const express = require('express')
const shippingMethodController = require('../Controllers/shippingMethodController')

function routes() {
  const shippingMethodRouter = express.Router()
  const controller = shippingMethodController()

  shippingMethodRouter.route('/shippingMethod').get(controller.get).post(controller.post)

  shippingMethodRouter
    .route('/shippingMethod/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

  return shippingMethodRouter
}

module.exports = routes
