const express = require('express')
const reviewController = require('../Controllers/reviewController')

function routes() {
  const reviewRouter = express.Router()
  const controller = reviewController()

  reviewRouter.route('/reviews').get(controller.get).post(controller.post)

  reviewRouter
    .route('/reviews/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

  return reviewRouter
}

module.exports = routes
