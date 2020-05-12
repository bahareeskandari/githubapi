const express = require('express')
const favoriteController = require('../Controllers/favoriteController')

function routes() {
  const favoriteRouter = express.Router()
  const controller = favoriteController()

  favoriteRouter.route('/favorite').get(controller.get).post(controller.post)

  favoriteRouter
    .route('/favorite/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

  return favoriteRouter
}

module.exports = routes
