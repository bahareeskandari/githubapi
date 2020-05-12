const express = require('express')
const categoryController = require('../Controllers/categoryController')

function routes() {
  const categoryRouter = express.Router()
  const controller = categoryController()

  categoryRouter.route('/category').get(controller.get).post(controller.post)

  categoryRouter
    .route('/category/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

  return categoryRouter
}

module.exports = routes
