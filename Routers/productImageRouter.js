const express = require('express')
const productImageController = require('../Controllers/productImageController')

function routes() {
  const productImageRouter = express.Router()
  const controller = productImageController()

  productImageRouter.route('/productImage').get(controller.get).post(controller.post)

  productImageRouter
    .route('/productImage/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

  return productImageRouter
}

module.exports = routes
