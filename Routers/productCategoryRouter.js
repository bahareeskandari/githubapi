const express = require('express')
const productCategoryController = require('../Controllers/productCategoryController')

function routes() {
  const productCategoryRouter = express.Router()
  const controller = productCategoryController()

  productCategoryRouter.route('/productCategory').get(controller.get).post(controller.post)

  productCategoryRouter
    .route('/productCategory/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

  return productCategoryRouter
}

module.exports = routes
