const express = require('express')
const paymentMethodController = require('../Controllers/paymentMethodController')

function routes() {
  const paymentMethodRouter = express.Router()
  const controller = paymentMethodController()

  paymentMethodRouter.route('/paymentMethod').get(controller.get).post(controller.post)

  paymentMethodRouter
    .route('/paymentMethod/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

  return paymentMethodRouter
}

module.exports = routes
