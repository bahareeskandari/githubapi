const express = require('express')
const cartProductController = require('../Controllers/cartProductController')

function routes() {
  const cartProductRouter = express.Router()
  const controller = cartProductController()

  cartProductRouter.route('/cartProducts').get(controller.get).post(controller.post)

  cartProductRouter
    .route('/cartProducts/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

  return cartProductRouter
}

module.exports = routes
