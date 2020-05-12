const express = require('express')
const orderController = require('../Controllers/orderController')

function routes() {
  const orderRouter = express.Router()
  const controller = orderController()

  orderRouter.route('/order').get(controller.get).post(controller.post)

  orderRouter.route('/order/:Id').get(controller.get).put(controller.put).delete(controller.remove)

  return orderRouter
}

module.exports = routes
