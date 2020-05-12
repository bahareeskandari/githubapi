const express = require('express')
const orderStatusController = require('../Controllers/orderStatusController')

function routes() {
  const orderStatusRouter = express.Router()
  const controller = orderStatusController()

  orderStatusRouter.route('/orderStatus').get(controller.get).post(controller.post)

  orderStatusRouter
    .route('/orderStatus/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

  return orderStatusRouter
}

module.exports = routes
