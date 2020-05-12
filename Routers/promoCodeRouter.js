const express = require('express')
const promoCodeController = require('../Controllers/promoCodeController')

function routes() {
  const promoCodeRouter = express.Router()
  const controller = promoCodeController()

  promoCodeRouter.route('/promoCode').get(controller.get).post(controller.post)

  promoCodeRouter
    .route('/promoCode/:Id')
    .get(controller.get)
    .put(controller.put)
    .delete(controller.remove)

  return promoCodeRouter
}

module.exports = routes
