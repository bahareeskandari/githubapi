const express = require('express')
const brandController = require('../Controllers/brandController')

function routes() {
  const brandRouter = express.Router()
  const controller = brandController()

  brandRouter.route('/brand').get(controller.get).post(controller.post)

  brandRouter.route('/brand/:Id').get(controller.get).put(controller.put).delete(controller.remove)

  return brandRouter
}

module.exports = routes
