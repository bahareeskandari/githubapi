const express = require('express')
const orderRowController = require('../Controllers/orderRowController')

function routes() {
  const orderRowRouter = express.Router()
  const controller = orderRowController()

  orderRowRouter.route('/orderRow').get(controller.get).post(controller.post)

  orderRowRouter
    .route('/orderRow/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

  return orderRowRouter
}

module.exports = routes
