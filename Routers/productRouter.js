const express = require('express')
const productController = require('../Controllers/productController')

function routes() {
  const productRouter = express.Router()
  const controller = productController()

  productRouter.route('/product').get(controller.get).post(controller.post)

  productRouter
    .route('/product/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

  return productRouter
}

module.exports = routes
